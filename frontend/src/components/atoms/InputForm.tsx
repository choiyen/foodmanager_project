import React from "react";
import styled from "styled-components";
import { Input } from "@chakra-ui/react";

const InputAtom = styled(Input)<{ marginRight?: string; $isLarge: boolean }>`
  width: ${({ $isLarge }) => ($isLarge ? "310px" : "150px")};
  margin-right: ${({ marginRight }) => marginRight || "0"};
  background-color: #ededed;
`;
interface InputProps {
  placeholder: string;
  marginRight?: string;
  $isLarge: boolean;
}

export default function InputForm({
  placeholder,
  marginRight,
  $isLarge,
}: InputProps) {
  return (
    <InputAtom
      placeholder={placeholder}
      marginRight={marginRight}
      $isLarge={$isLarge}
    />
  );
}
