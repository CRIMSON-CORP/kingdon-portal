interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

interface AsideContent {
  avatar: string;
  userId: string;
  title: string;
  content: string;
}

interface User {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  unique_id: string;
  email: string;
  status: "free" | "suspended" | "banned";
  description: string | null;
  image_url: string | null;
  role: Role;
}

interface Role {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  role: "user" | "admin";
  active: number;
}

interface PaginationData {
  page: number;
  rows: number;
  pageSize: number;
  pages: number;
  offset: number;
}
