import React from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import ValidationMessage from "../atoms/Validation Message";
import { useContext } from "react";
import { PasswordResetContext } from "../pages/PasswordResetPage";
interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  errorMessage?: string;
}

export default function InputField({
  label,
  id,
  name,
  type,
  placeholder,
  errorMessage,
}: InputFieldProps) {
  const ResetOne = useContext(PasswordResetContext);

  return (
    <div className="input-field">
      <Label htmlFor={id} text={label} />
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={ResetOne?.email}
        onChange={(e) => ResetOne?.setEmail(e.target.value)}
      />
      {errorMessage && <ValidationMessage message={errorMessage} />}
    </div>
  );
}
