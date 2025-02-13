import React from "react";
import {
  NumberInputLabel,
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";

interface NumberInputProps {
  label: string;
  helperText: string;
  required: boolean;
  placeholder: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function NumberInputForm({}: NumberInputProps) {
  return (
    <NumberInputRoot width="200px" defaultValue="10" min={5} max={50}>
      <NumberInputField />
    </NumberInputRoot>
  );
}
