import backendAxios from "@/lib/axios";
import { nextAuthOptions } from "@/lib/next-auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type Params = {
  testimony_id: string;
};

async function GET(req: Request, ctx: { params: Params }) {
  const session = await getServerSession(nextAuthOptions);
  try {
    const response = await backendAxios.get(
      `/comment/testimony/${ctx.params.testimony_id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      }
    );
    return NextResponse.json({ ...response.data }, { status: response.status });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

async function POST(req: Request) {
  const session = await getServerSession(nextAuthOptions);
  const body = await req.json();
  try {
    const response = await backendAxios.post(`/comment`, body, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    return NextResponse.json({ ...response.data }, { status: response.status });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export { GET, POST };
