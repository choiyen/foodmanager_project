import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { sign } from "crypto";

interface TextInputProps {
  placeholder: string;
  label: string;
  value: string;
  setValue: (e: string) => void;
  invalid?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function TextInput({
  placeholder,
  label,
  value,
  setValue,
  invalid = false,
  required = true,
}: TextInputProps) {
  return (
    <Field
      label={label}
      fontWeight="bold"
      marginBottom="20px"
      mt="20px"
      errorText={"이메일 주소에는 @가 포함되어야 합니다."}
      invalid={invalid}
      required={required}
    >
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Field>
  );
}
