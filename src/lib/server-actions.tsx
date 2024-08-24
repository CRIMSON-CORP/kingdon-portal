"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
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

export async function getUsers<T>(
  params: PageProps["searchParams"]
): Promise<T> {
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

export async function postPrayer(
  payload: Pick<Prayer, "title" | "description" | "image">
) {
  const session = await getServerSession(nextAuthOptions);
  try {
    const response = await axios.post("/prayer", payload, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function getPrayers<T>(params: PageProps["searchParams"]) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await axios.get("/prayer", {
      params: {
        ...params,
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

export async function toggleLike(params: { prayerId: string; like: boolean }) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const method = params.like ? "post" : "patch";
    const urlBack = params.like ? "like" : "unlike";
    const response = await axios[method](
      `/like/${urlBack}-prayer`,
      {
        prayer_uuid: params.prayerId,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function startPraying(prayer_uuid: string) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await axios.post(
      "/prayer/start-praying",
      { prayer_uuid },
      {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
