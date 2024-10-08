import { nextAuthOptions } from "@/lib/next-auth-options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Form from "./Form";

async function Page() {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col gap-6 items-center pb-80">
      <header className="text-center max-w-[438px]">
        <h1 className="text-[#020b23] text-[42px] font-light">
          Be a part of the <span className="font-semibold">Family!</span>
        </h1>
      </header>
      <div className="flex flex-col items-center gap-16 bg-white rounded-[20px] border border-[#e7e7e7] max-w-[800px] w-full p-8">
        <h2 className="text-center text-[#020b23] text-xl font-light">
          Create a free account today to get started
        </h2>
        <Form />
        <p className="text-[#bbbec1] text-sm">
          Already have an account?{" "}
          <Link href="login" className="text-[#2967b3]">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
