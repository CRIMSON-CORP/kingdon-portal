"use client";
import Icon from "@/components/Icon";
import { useState } from "react";

function InputPassword({
  name,
  required = false,
}: {
  name: string;
  required?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const openPassword = () => {
    setShowPassword(true);
  };
  const hidePassword = () => {
    setShowPassword(false);
  };
  return (
    <div className="bg-white rounded-[10px] border border-[#121212]/10 items-center gap-2.5 inline-flex px-6 py-4">
      <Icon name="lock" />
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        className="w-full outline-none"
        required={required}
      />
      {showPassword ? (
        <button type="button" onClick={hidePassword}>
          <Icon name="eye-closed" />
        </button>
      ) : (
        <button type="button" onClick={openPassword}>
          <Icon name="eye-closed" />
        </button>
      )}
    </div>
  );
}

export default InputPassword;
