import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const apiUrl = "http://localhost:8001/api/web/v1/products";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const search = searchParams.get("search") || "";

  try {
    const response = await axios.get(apiUrl, {
      params: {
        page,
        limit,
        search,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[API_PRODUCTS_GET] Error:", searchParams);
    return new NextResponse("Failed to fetch data from external API", {
      status: 500,
    });
  }
}
