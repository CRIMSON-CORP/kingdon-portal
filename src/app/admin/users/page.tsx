import { getUsers } from "@/lib/server-actions";
import Image from "next/image";
import ListPagination from "./Pagination";

async function page({ searchParams }: PageProps) {
  const params = { ...searchParams };
  const users: PaginationData & { data: User[] } = await getUsers(params);

  return (
    <div className="flex flex-col gap-5">
      {users.data.map((user) => (
        <UserCard key={user.uuid} {...user} />
      ))}
      <ListPagination {...users} />
    </div>
  );
}

export default page;

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

function UserCard({ image_url, email, unique_id, updated_at }: User) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2.5">
        <Image
          src={image_url || "/img/avatar.png"}
          width={60}
          height={60}
          alt={email}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{unique_id}</p>
          <p className="h-[11px] text-[#808591] text-xs font-normal">{email}</p>
          <p className="text-[#808591] text-[9px] font-light mt-1.5">
            Joined {dateFormatter.format(new Date(updated_at))}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button className="py-1.5 px-5 bg-[#2967b3] rounded text-white text-[13px]">
          Message
        </button>
      </div>
    </div>
  );
}
