import React from "react";
import styled from "styled-components";
import RatingBox from "../molecules/RatingBox";
import HeadingAtom from "../atoms/HeadingAtom";

interface RecipeInfoProps {
  title: string;
  rating?: number;
}

const Container = styled.div`
  height: 30%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 768px) {
    height: 30%;
  }
`;

export default function RecipeInfo({ title, rating = 2.5 }: RecipeInfoProps) {
  return (
    <Container>
      <HeadingAtom level={4}>{title}</HeadingAtom>
      <RatingBox rating={rating} />
    </Container>
  );
}
