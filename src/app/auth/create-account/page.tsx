"use client";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import InputPassword from "./InputPassword";

function Page() {
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { push } = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      setRequestStatus("loading");

      const response = await axios.post("/api/auth/create-account", {
        email: username,
        password,
      });
      if (!response) throw new Error("Network Request Failed");
      const { data, status } = response;
      if (status !== 200) throw new Error(data.message);
      else {
        setRequestStatus("success");
        toast.success("Signup Successful, Please login to continue.");
        push("/auth/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message?.join(",") || error.message);
      setRequestStatus("idle");
    }
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
            {requestStatus !== "idle" ? "Siging up..." : "Login"}
          </button>
        </form>
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
