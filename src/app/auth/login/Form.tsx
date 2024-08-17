"use client";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import InputPassword from "./InputPassword";

function Form() {
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { push } = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      setRequestStatus("loading");

      const response = await signIn("credentials", {
        username,
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
    <form
      onSubmit={handleSubmit}
      className="max-w-[616px] w-full flex-col flex gap-9"
    >
      <div className="grid w-full items-center gap-4">
        <Label htmlFor="email">Email Address/Username</Label>
        <div className="bg-white rounded-[10px] border border-[#121212]/10 items-center gap-2.5 inline-flex px-6 py-4">
          <input
            type="text"
            name="username"
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
        <Link href="/auth/forgot-password" className="text-[#939597] text-sm">
          Forgot password?
        </Link>
      </div>
      <button
        disabled={requestStatus !== "idle"}
        className="p-5 bg-[#2967b3] rounded-[10px] justify-center items-center gap-2.5 flex text-center text-white text-base font-medium leading-tight"
      >
        {requestStatus !== "idle" ? "Loggin in..." : "Login"}
      </button>
    </form>
  );
}

export default Form;
