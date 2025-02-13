import React from "react";
import styled from "styled-components";
import Star from "../atoms/Star";

const TagBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50px;
  height: 20px;
  padding: 5px 3px;
  box-sizing: border-box;
  background-color: #fe8d00;
  border-radius: 16px;
  font-size: 15px;
`;

interface Props {
  rating?: number;
  className?: string;
}

export default function RatingTag({ rating = 0.0, className }: Props) {
  return (
    <TagBox className={className}>
      <Star size={15} />
      {rating}
    </TagBox>
  );
}
