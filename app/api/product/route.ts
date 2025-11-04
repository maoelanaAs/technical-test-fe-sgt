import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:8001/api/web/v1/product";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get("product_id");

  if (!productId) {
    return new NextResponse("Product ID is required", { status: 400 });
  }

  try {
    const response = await axios.get(BACKEND_URL, {
      params: { product_id: productId },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[API_PRODUCT_GET] Error:", error);
    return new NextResponse("Failed to fetch product", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      product_title,
      product_price,
      product_description,
      product_image,
      product_category,
    } = body;

    const response = await axios.post(BACKEND_URL, {
      product_title,
      product_price,
      product_description,
      product_image,
      product_category,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[API_PRODUCT_POST] Error:", error);
    return new NextResponse("Failed to create product", { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      product_id,
      product_title,
      product_price,
      product_description,
      product_image,
      product_category,
    } = body;

    if (!product_id) {
      return new NextResponse("Product ID is required for update", {
        status: 400,
      });
    }
    const response = await axios.put(BACKEND_URL, {
      product_id,
      product_title,
      product_price,
      product_description,
      product_image,
      product_category,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[API_PRODUCT_PUT] Error:", error);
    return new NextResponse("Failed to update product", { status: 500 });
  }
}
