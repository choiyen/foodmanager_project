import React from "react";
import { Textarea } from "@chakra-ui/react";
import { Field } from "../ui/field";

interface TextareaFormProps {
  placeholder: string;
  label: string;
  value: string;
  setValue: (e: string) => void;
}

export default function TextareaForm({
  placeholder,
  label,
  value,
  setValue,
}: TextareaFormProps) {
  return (
    <Field label={label} required fontWeight="bold" mt="20px">
      <Textarea
        placeholder={placeholder}
        variant="outline"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Field>
  );
}
