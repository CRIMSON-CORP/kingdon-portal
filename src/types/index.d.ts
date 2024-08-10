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
