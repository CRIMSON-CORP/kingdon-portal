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

interface Prayer {
  uuid: string;
  created_at: string;
  updated_at: string;
  title: string;
  like_count: string;
  comment_count: string;
  praying_user_count: string;
  description: string;
  user: User;
  praying: null;
  liked: number;
  user_prayer_status: null;
  image?: string;
  mode: "request" | "prayer";
}

interface UserLike {
  id: number;
  uuid: string;
  created_at: string;
}

interface Testimony {
  id: number;
  uuid: string;
  description: string;
  comment_count: string;
  like_count: string;
  praying_user_count: number | null;
  user: User;
  prayer: Prayer;
  liked: string;
  mode: "request" | "prayer";
}

interface PrayerComment {
  id: string;
  comment: string;
  user: {
    created_at: string;
    deleted_at: string | null;
    description: string | null;
    email: string | null;
    id: number | string;
    image_url: string | null;
    status: "free";
    unique_id: string;
    updated_at: string;
    uuid: string;
  };
  created_at: string;

  deleted_at: string | null;
  id: number;
  replies: PrayerComment[];
  title: string;
  updated_at: string;
  uuid: string;
}

interface UserDashboard {
  prayer_count: number;
  testimony_count: number;
  chosen_prayer_count: number;
  completed_prayer_count: number;
  user: {
    uuid: string;
    unique_id: string;
    email: string;
    image_url: string | null;
  };
}
