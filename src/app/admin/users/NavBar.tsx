import { getUsersNoParams } from "@/lib/server-actions";
import NavLink from "./NavLink";

async function NavBar() {
  const users = await getUsersNoParams<{ data: User[] }>();

  const suspendedUsers = users.data.filter(
    (user) => user.status === "suspended" || user.status === "banned"
  );

  return (
    <nav className="[&>[data-active='true']]:text-[#2967b3] text-[#808591] text-base font-medium font-['Lexend Deca'] flex gap-5 items-center">
      <NavLink
        pageKey={null}
        href="/admin/users"
        label="All"
        count={users.data.length.toString()}
      />
      <NavLink
        pageKey="suspended"
        href="/admin/users?view=suspended"
        label="Suspended/Banned Users "
        count={suspendedUsers.length.toString()}
      />
    </nav>
  );
}

export default NavBar;
