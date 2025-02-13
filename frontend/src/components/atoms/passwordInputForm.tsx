import React, { useState } from "react";
import { PasswordInput } from "../ui/password-input";
import { Field } from "../ui/field";

interface InputProps {
  label: string;
  placeholder: string;
  helperText?: string;
  required?: boolean;
  value: string;
  setValue: (e: string) => void;
}

export default function PasswordInputForm({
  label,
  helperText,
  required = false,
  placeholder,
  value,
  setValue,
}: InputProps) {
  // const [value, setValue] = useState("");
  return (
    <Field
      label={label}
      required={required}
      helperText={helperText}
      fontWeight="bold"
    >
      <PasswordInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Field>
  );
}
