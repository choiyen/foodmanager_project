import React from "react";
import styled from "styled-components";
import HeadingAtom from "../atoms/HeadingAtom";

const ParaGraph = styled.p`
  font-size: 16px;
  color: #a1a1a1;
`;
const RecipeName = styled.div`
  padding: 10px 20px;
`;

export default function ViewRecipeHead({
  title,
  describe,
}: {
  title: string;
  describe: string;
}) {
  return (
    <RecipeName>
      <HeadingAtom level={2} $marginBottom="10px">
        {title}
      </HeadingAtom>
      <ParaGraph>{describe}</ParaGraph>
    </RecipeName>
  );
}
