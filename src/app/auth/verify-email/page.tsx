import Icon from "@/components/Icon";
import Link from "next/link";
import { Suspense } from "react";
import Form from "./Form";

async function Page() {
  // const session = await getServerSession(nextAuthOptions);
  // if (session) {
  //   redirect("/dashboard");
  // }
  return (
    <div className="flex flex-col gap-6 items-center pb-80 mx-auto max-w-[800px]">
      <Link href="/auth/login" className="self-start">
        <Icon name="arrow-left" />
      </Link>
      <header className="text-center max-w-[438px]">
        <h1 className="text-[#020b23] text-[42px] font-light">
          Verify <span className="font-semibold">Email</span>
        </h1>
      </header>
      <div className="flex flex-col items-center gap-16 bg-white rounded-[20px] border border-[#e7e7e7] w-full p-8">
        <h2 className="text-center text-[#020b23] text-xl font-light max-w-[476px]">
          A verification code has been sent to you, Please enter the code
        </h2>
        <Suspense>
          <Form />
        </Suspense>
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
