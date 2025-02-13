import React from "react";
import styled from "styled-components";
import HeadingAtom from "../atoms/HeadingAtom";
import Profileimg from "../atoms/Profileimg";

interface RecipeInfoProps {
  userId?: string;
  title: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 15px;

  @media (min-width: 768px) {
    height: 30%;
  }
`;
const ContentWrap = styled.div`
  width: 100%;
`;

const IdHeading = styled(HeadingAtom)`
  font-weight: 500;
  font-size: 15px;
`;

const TitleHeading = styled(HeadingAtom)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 50px);
`;

export default function FeedInfo({
  userId,
  title,
  size = "xl",
}: RecipeInfoProps) {
  return (
    <Container>
      <Profileimg size={size} />
      <ContentWrap>
        <IdHeading level={3}>{userId}</IdHeading>
        <TitleHeading level={4}>{title}</TitleHeading>
      </ContentWrap>
    </Container>
  );
}
