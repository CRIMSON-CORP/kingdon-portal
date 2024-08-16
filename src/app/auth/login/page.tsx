"use client";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import InputPassword from "./InputPassword";

function Page() {
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { push } = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setRequestStatus("loading");

      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (!response) throw new Error("Network Request Failed");
      const { ok, error, url } = response;
      if (error) throw new Error(error);
      if (ok) {
        setRequestStatus("success");
        toast.success("Login Successful");
        push(searchParams.get("callbackUrl") || url || "/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message);
      setRequestStatus("idle");
    }
  }

  return (
    <div className="flex flex-col gap-6 items-center pb-80">
      <header className="text-center max-w-[438px]">
        <h1 className="text-[#020b23] text-[42px] font-light">
          Welcome back to the <span className="font-semibold">Family!</span>
        </h1>
      </header>
      <div className="flex flex-col items-center gap-16 bg-white rounded-[20px] border border-[#e7e7e7] max-w-[800px] w-full p-8">
        <h2 className="text-center text-[#020b23] text-xl font-light">
          Sign in to your account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-[616px] w-full flex-col flex gap-9"
        >
          <div className="grid w-full items-center gap-4">
            <Label htmlFor="email">Email Address/Username</Label>
            <div className="bg-white rounded-[10px] border border-[#121212]/10 items-center gap-2.5 inline-flex px-6 py-4">
              <input
                type="email"
                name="email"
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-4">
            <Label htmlFor="email">Password</Label>
            <InputPassword name="password" required />
          </div>
          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-[#939597] text-sm"
            >
              Forgot password?
            </Link>
          </div>
          <button
            disabled={requestStatus !== "idle"}
            className="p-5 bg-[#2967b3] rounded-[10px] justify-center items-center gap-2.5 flex text-center text-white text-base font-medium leading-tight"
          >
            {requestStatus !== "idle" ? "Logginin..." : "Login"}
          </button>
        </form>
        <p className="text-[#bbbec1] text-sm">
          Don&apos;t have an account?{" "}
          <Link href="create-account" className="text-[#2967b3]">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
