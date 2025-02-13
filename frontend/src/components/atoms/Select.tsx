import React from "react";
import styled from "styled-components";
import Option from "./Option";

const SelectAtom = styled.select<{
  width: string;
  height: string;
  mr?: string;
}>`
  background-color: #ffffff;
  padding: 5px;
  width: ${({ width }) => width || "0px"};
  height: ${({ height }) => height || "50px"};
  margin-right: ${({ mr }) => mr || "0px"};
  border: 1px solid #ccc;
  border-radius: 5px;
`;

interface SelectProps {
  options: { id: string; text: string }[];
  width: string;
  height: string;
  mr?: string;
}

export default function Select({ options, width, height, mr }: SelectProps) {
  return (
    <SelectAtom width={width} height={height} mr={mr}>
      {options.map((option) => {
        return <Option key={option.id} text={option.text} />;
      })}
    </SelectAtom>
  );
}
