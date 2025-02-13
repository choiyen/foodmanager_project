import React from "react";
import styled from "styled-components";

interface TextboxAtomProps {
  width?: string;
  height?: string;
  margin?: string;
}

const TextBox = styled.textarea<TextboxAtomProps>`
  background-color: #ebebeb;
  width: ${({ width }) => width || "80vw"};
  height: ${({ height }) => height || "50px"};
  margin: ${({ margin }) => margin || "0"};
  border-radius: 5px;
  padding: 5px;
`;
export default function TextboxAtom({
  width,
  height,
  margin,
}: TextboxAtomProps) {
  return (
    <TextBox
      placeholder="내용을 입력해 주세요"
      width={width}
      height={height}
      margin={margin}
    ></TextBox>
  );
}
