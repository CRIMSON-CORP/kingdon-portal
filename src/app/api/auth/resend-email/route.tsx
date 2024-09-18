import axios from "@/lib/axios";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const response = await axios.post("/user/resend-otp", data);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(error.response.data, {
      status: error.response.status,
    });
  }
}
