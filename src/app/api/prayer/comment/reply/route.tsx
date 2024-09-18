import backendAxios from "@/lib/axios";
import { nextAuthOptions } from "@/lib/next-auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function POST(req: Request) {
  const session = await getServerSession(nextAuthOptions);
  const body = await req.json();
  try {
    const response = await backendAxios.post(`/comment/reply-comment`, body, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    return NextResponse.json({ ...response.data }, { status: response.status });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export { POST };
