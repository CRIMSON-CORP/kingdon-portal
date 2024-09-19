"use client";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

function SignOut() {
  const handleSignOut = () => {
    toast.promise(signOut(), {
      loading: "Signing out...",
      success: "Signed out successfully",
      error: "Failed to sign out",
    });
  };
  return (
    <button
      onClick={handleSignOut}
      className="p-4 bg-red-200 rounded border border-red-400 w-full max-w-[163px] text-center text-sm font-normal"
    >
      Sign Out
    </button>
  );
}

export default SignOut;
