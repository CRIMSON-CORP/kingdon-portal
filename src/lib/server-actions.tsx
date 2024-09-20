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

    revalidatePath("/", "layout");
    console.log("should have revalidated path");
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

export async function toggleLikeTestimony(params: {
  prayerId: string;
  like: boolean;
}) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const method = params.like ? "post" : "patch";
    const urlBack = params.like ? "like" : "unlike";
    const response = await axios[method](
      `/like/${urlBack}-testimony`,
      {
        testimony_uuid: params.prayerId,
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
    revalidatePath("/");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function donePraying(prayer_uuid: string) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await axios.patch(
      "/prayer/done-praying",
      { prayer_uuid },
      {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      }
    );
    revalidatePath("/", "layout");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getLikes<T>(
  prayer_uuid: string,
  page: number
): Promise<T> {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await axios.get("/user/liked-prayer", {
      params: {
        prayer_uuid,
        page,
        size: parseInt(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE || "10"),
      },
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    return response.data.data.data as T;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getChosen<T>(
  prayer_uuid: string,
  page: number
): Promise<T> {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await axios.get("/user/chose-prayer", {
      params: {
        prayer_uuid,
        page,
        size: parseInt(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE || "10"),
      },
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    return response.data.data.data as T;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTestimonies<T>({
  self,
  page,
}: {
  self: "self" | "others";
  page: number;
}) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const response = await axios.get("/testimony", {
      params: {
        page,
        self,
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

export async function postTestimony(
  payload: Pick<Prayer, "uuid" | "description" | "image">
) {
  const session = await getServerSession(nextAuthOptions);
  try {
    const response = await axios.post(
      "/testimony",
      { prayer_uuid: payload.uuid, testimony: payload.description },
      {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      }
    );

    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function getDashboardData<T>(path?: string) {
  const session = await getServerSession(nextAuthOptions);
  try {
    const response = await axios.get("/user/user-dashboard", {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });

    path && revalidatePath(path);
    return response.data.data as T;
  } catch (error) {
    throw error;
  }
}

export async function getAdminDashboardData<T>(path?: string) {
  const session = await getServerSession(nextAuthOptions);
  try {
    const response = await axios.get("/user/admin-dashboard", {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });

    path && revalidatePath(path);
    return response.data.data as T;
  } catch (error) {
    throw error;
  }
}
