"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import TypedInputNumber, { InputNumberProps } from "antd/es/input-number";
import { Content, Header } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useDebounce } from "../hooks/useDebounce";

const { Search } = Input;
const { Title } = Typography;

interface Products {
  product_id: string;
  product_title: string;
  product_price: number;
  product_description?: string;
  product_image?: string;
  product_category?: string;
  created_timestamp: string;
  updated_timestamp: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  search?: string;
}

export default function Products() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
    search: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [form] = Form.useForm();
  const debouncedSearchTerm = useDebounce(pagination.search, 300);

  const fecthProducts = useCallback(
    async (page: number, search?: string) => {
      setLoading(true);
      try {
        const response = await axios.get("/api/products", {
          params: {
            page: page,
            limit: pagination.limit,
            search: search,
          },
        });

        setProducts(response.data.data);

        const apiPagination = response.data.pagination;

        setPagination((prev) => ({
          ...prev,
          page: apiPagination.page,
          limit: apiPagination.limit,
          total: apiPagination.total,
          total_pages: apiPagination.total_pages,
        }));
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        message.error("Failed to load product data");
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit]
  );

  useEffect(() => {
    fecthProducts(pagination.page, debouncedSearchTerm);
  }, [debouncedSearchTerm, pagination.page, fecthProducts]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page: page }));
  };

  const showCreateModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const showEditModal = (product: Products) => {
    setEditingProduct(product);
    form.setFieldsValue({
      ...product,
    });
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (editingProduct) {
        await axios.put("/api/product", {
          ...values,
          product_id: editingProduct.product_id,
        });
        message.success("Product updated successfully");
      } else {
        await axios.post("/api/product", values);
        message.success("Product added successfully");
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      fecthProducts(pagination.page, debouncedSearchTerm);
    } catch (error) {
      console.error("Failed to save product:", error);
      message.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (productId: string) => {
    message.success(`(Demo) Successfully Deleted Product: ${productId}`);
  };

  const columns: ColumnsType<Products> = [
    {
      title: "Product Title",
      dataIndex: "product_title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "price",
      render: (price: number) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price),
    },
    {
      title: "Category",
      dataIndex: "product_category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "product_description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            color="orange"
            variant="filled"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Product"
            description="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.product_id)}
            okText="Yes, delete it"
            cancelText="Cancel"
          >
            <Button color="danger" variant="filled" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const inputFormatter: InputNumberProps<number>["formatter"] = (value) => {
    const [start, end] = `${value}`.split(".") || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${end ? `${v}.${end}` : `${v}`}`;
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh", background: "LightSteelBlue" }}>
        <Header>
          <Space
            style={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Title level={2} style={{ color: "HighlightText", margin: 0 }}>
              Dashboard Product
            </Title>
            <Search
              placeholder="Search Product"
              style={{ display: "block", width: "25vw" }}
              allowClear
              enterButton
              value={pagination.search}
              onChange={(e) => {
                const newSearch = e.target.value;
                setPagination((prev) => ({
                  ...prev,
                  search: newSearch,
                  page: 1,
                }));
              }}
            />
            <Button type="primary" onClick={showCreateModal}>
              <PlusCircleFilled />
              Add Product
            </Button>
          </Space>
        </Header>
        <Content style={{ padding: "24px 48px" }}>
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
            }}
          >
            <Table
              columns={columns}
              dataSource={products}
              rowKey="product_id"
              loading={loading}
              pagination={false}
              size="middle"
            />
            <Pagination
              style={{ marginTop: 24 }}
              current={pagination.page}
              total={pagination.total}
              pageSize={pagination.limit}
              onChange={handlePageChange}
              showSizeChanger={false}
              align="center"
            />
          </div>
        </Content>
      </Layout>
      <Modal
        title={editingProduct ? "Edit Product" : "Add New Product"}
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="product_title"
            label="Product Title"
            rules={[{ required: true, message: "Please enter Product Title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="product_price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please enter Product Price!",
              },
            ]}
          >
            <TypedInputNumber
              style={{ width: "100%" }}
              prefix="$"
              formatter={inputFormatter}
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
            />
          </Form.Item>

          <Form.Item name="product_category" label="Category">
            <Input />
          </Form.Item>

          <Form.Item name="product_description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="product_image" label="Image URL">
            <Input />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={handleModalCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingProduct ? "Update" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
