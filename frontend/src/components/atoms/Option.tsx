import React from "react";
import styled from "styled-components";

const OptionAtom = styled.option`
  background-color: "#EBEBEB";
`;
interface Props {
  text: string;
}
export default function Option({ text }: Props) {
  return <OptionAtom value={text}>{text}</OptionAtom>;
}
