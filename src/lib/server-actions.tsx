"use server";

import { getServerSession } from "next-auth";
import axios from "./axios";
import { nextAuthOptions } from "./next-auth-options";

export async function getUsersNoParams<T>() {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await axios.get("/user", {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    return response.data.data as T;
  } catch (error) {
    throw error;
  }
}

export async function getUsers<T>(params: any): Promise<T> {
  try {
    const view = params.view;
    delete params.view;
    const session = await getServerSession(nextAuthOptions);
    const response = await axios.get("/user", {
      params: {
        ...params,
        ...(view === "suspended" ? { status: "suspended,banned" } : {}),
        size: parseInt(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE || "10"),
      },
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    return response.data.data as T;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
