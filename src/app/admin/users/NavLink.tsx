"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface NavLinkProps {
  href: string;
  pageKey: string | null;
  count?: string;
  label: string;
}

function NavLink({ href, pageKey, count, label }: NavLinkProps) {
  const urlSearchParams = useSearchParams();
  const view = urlSearchParams.get("view");

  return (
    <Link href={href} data-active={view === pageKey}>
      {label} - {count}
    </Link>
  );
}

export default NavLink;
