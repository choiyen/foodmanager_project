import React from "react";
import styled from "styled-components";
import HeadingAtom from "../atoms/HeadingAtom";

interface IngredientData {
  kindFood: string;
  unit: string;
  amount: number;
  expiration: string;
  $remainDate: number;
}

const FoodCategory = styled(HeadingAtom)<{ $remainDate: number }>`
  font-size: 20px;
  color: ${({ $remainDate }) => ($remainDate <= 0 ? "#ffffff" : "#fe8d00")};
  font-weight: 700;
`;
const FoodName = styled(HeadingAtom)<{ $remainDate: number }>`
  color: ${({ $remainDate }) => ($remainDate <= 0 ? "#ffffff" : "#121212")};
  font-size: 15px;
  font-weight: 500;
`;
const KcalStyled = styled.p<{ $remainDate: number }>`
  color: ${({ $remainDate }) => ($remainDate <= 0 ? "#ffffff" : "#9c9c9c")};
  font-size: 15px;
  font-weight: 500;
`;

export default function IngredientInfo({
  kindFood,
  unit,
  amount,
  expiration,
  $remainDate,
}: IngredientData) {
  return (
    <div>
      <FoodCategory
        level={3}
        $remainDate={$remainDate}
        // $marginBottom={introduce ? "0px" : "20px"}
      >
        {kindFood}
      </FoodCategory>
      <FoodName
        level={3}
        $remainDate={$remainDate}
        // $marginBottom={introduce ? "0px" : "20px"}
      >
        {amount + unit}
      </FoodName>
      <KcalStyled $remainDate={$remainDate}>{expiration}</KcalStyled>
    </div>
  );
}
