import React from "react";
import styled from "styled-components";
import Star from "../atoms/Star";
const Container = styled.div`
  display: flex;
`;
const StarStyle = styled(Star)<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "orange" : "#ccc")};
`;

export default function RatingBox({ rating }: { rating: number }) {
  return (
    <Container>
      {Array.from({ length: 5 }, (_, idx) => (
        <StarStyle key={idx} size={20} isActive={idx < Math.floor(rating)} />
      ))}
      <span>{rating.toFixed(1)}</span>
    </Container>
  );
}
