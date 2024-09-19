"use client";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Form() {
  const params = useSearchParams();
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [canResendOtp, setCanResendOtp] = useState(true);
  const [sendingOtp, setSendingOtp] = useState(false);

  const { push } = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const otp = formData.get("otp");
    const email = params.get("email");

    if (!email) {
      toast.error("Email not found");
      return;
    }

    if (!otp) {
      toast.error("OTP is Required");
      return;
    }

    if (otp.toString().length < 6) {
      toast.error("Invalid OTP");
      return;
    }

    try {
      setRequestStatus("loading");

      const response = await axios.post("/api/auth/verify-otp", {
        email,
        otp,
      });
      if (!response) throw new Error("Network Request Failed");
      const { data, status } = response;
      if (status !== 200) throw new Error(data.message);
      else {
        setRequestStatus("success");
        toast.success("Verification Successful, Please login to continue.");
        push("/auth/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
      setRequestStatus("idle");
    }
  }

  async function resendEmail() {
    const email = params.get("email");
    if (!email) {
      toast.error("Email not found");
      return;
    }
    if (!canResendOtp) {
      toast.error("Please try again in 1 minute");
      return;
    }
    try {
      setSendingOtp(true);
      const response = await axios.post("/api/auth/resend-email", {
        email,
      });
      if (!response) throw new Error("Network Request Failed");
      const { data, status } = response;
      if (status !== 200) throw new Error(data.message);
      else {
        setSendingOtp(false);
        toast.success("Email sent successfully");
        setCanResendOtp(false);
        setTimeout(() => setCanResendOtp(true), 60000);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
      setSendingOtp(false);
    }
  }

  const onComplete = () => {
    setCanResendOtp(true);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[616px] w-full flex-col items-center flex gap-9"
    >
      <InputOTP
        name="otp"
        containerClassName="justify-center w-full"
        className=""
        maxLength={6}
      >
        <InputOTPSlot
          index={0}
          className="w-[77px] h-[50px] bg-[#f8f9f9] !rounded border-t-0 border-r-0 !border-l-0 border-solid !border-[#E7E7E7] border-b-2 valid:border-b-[#2967B3]"
        />
        <InputOTPSlot
          index={1}
          className="w-[77px] h-[50px] bg-[#f8f9f9] !rounded border-t-0 border-r-0 !border-l-0 border-solid !border-[#E7E7E7] border-b-2 valid:border-b-[#2967B3]"
        />
        <InputOTPSlot
          index={2}
          className="w-[77px] h-[50px] bg-[#f8f9f9] !rounded border-t-0 border-r-0 !border-l-0 border-solid !border-[#E7E7E7] border-b-2 valid:border-b-[#2967B3]"
        />
        <InputOTPSlot
          index={3}
          className="w-[77px] h-[50px] bg-[#f8f9f9] !rounded border-t-0 border-r-0 !border-l-0 border-solid !border-[#E7E7E7] border-b-2 valid:border-b-[#2967B3]"
        />
        <InputOTPSlot
          index={4}
          className="w-[77px] h-[50px] bg-[#f8f9f9] !rounded border-t-0 border-r-0 !border-l-0 border-solid !border-[#E7E7E7] border-b-2 valid:border-b-[#2967B3]"
        />
        <InputOTPSlot
          index={5}
          className="w-[77px] h-[50px] bg-[#f8f9f9] !rounded border-t-0 border-r-0 !border-l-0 border-solid !border-[#E7E7E7] border-b-2 valid:border-b-[#2967B3]"
        />
      </InputOTP>
      {!canResendOtp ? (
        <ResendTimeout onComplete={onComplete} time={60} />
      ) : (
        <div>
          <span className="text-[#939597] text-sm font-normal font-['Lexend Deca']">
            Resend OTP via email?
          </span>{" "}
          <button
            type="button"
            disabled={sendingOtp}
            onClick={resendEmail}
            className="text-[#2967b3] text-sm font-medium font-['Lexend Deca']"
          >
            {sendingOtp ? "Sending" : "Click here"}
          </button>
        </div>
      )}
      <button
        disabled={requestStatus !== "idle"}
        className="p-5 w-full bg-[#2967b3] rounded-[10px] justify-center items-center gap-2.5 flex text-center text-white text-base font-medium leading-tight"
      >
        {requestStatus !== "idle" ? "Verifying..." : "Continue"}
      </button>
    </form>
  );
}

export default Form;

function ResendTimeout({
  time,
  onComplete,
}: {
  time: number;
  onComplete: () => void;
}) {
  const [timeout, settimeout] = useState(time);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeout === 0) {
        onComplete();
        return clearInterval(interval);
      }
      settimeout(timeout - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [onComplete, timeout]);
  const minutes = Math.floor(timeout / 60);
  const seconds = timeout % 60;
  return (
    <div>
      <span className="text-[#939597] text-sm font-normal font-['Lexend Deca']">
        Resend code in{" "}
        {`${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`}
      </span>
    </div>
  );
}
