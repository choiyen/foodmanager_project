import React from "react";
import styled from "styled-components";
import InputForm from "../atoms/InputForm";
import { Field } from "../ui/field";

interface OneInputProps {
  placeholder: string;
  label?: string;
  helperText?: string;
  required?: boolean;
}

export default function OneInput({
  placeholder,
  label,
  required,
  helperText,
}: OneInputProps) {
  return (
    <Field
      label={label}
      required={required}
      helperText={helperText}
      fontWeight="bold"
      width="320px"
    >
      <InputForm placeholder={placeholder} $isLarge={true} marginRight="10px" />
    </Field>
  );
}
