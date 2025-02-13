import React from "react";
import styled from "styled-components";

import InputForm from "../atoms/InputForm";
import { Field } from "../ui/field";

const Container = styled.div`
  display: flex;
`;

interface TwoInputProps {
  placeholder1: string;
  placeholder2: string;
  label?: string;
  helperText?: string;
  required?: boolean;
}

export default function TwoInput({
  placeholder1,
  placeholder2,
  label,
  helperText,
  required = false,
}: TwoInputProps) {
  return (
    <Field label={label} required={required} helperText={helperText}>
      <Container>
        <InputForm
          placeholder={placeholder1}
          marginRight="10px"
          $isLarge={false}
        />
        <InputForm
          placeholder={placeholder2}
          marginRight="10px"
          $isLarge={false}
        />
      </Container>
    </Field>
  );
}
