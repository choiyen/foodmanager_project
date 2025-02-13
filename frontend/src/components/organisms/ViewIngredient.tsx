import React from "react";
import styled from "styled-components";
import HeadingAtom from "../atoms/HeadingAtom";
import { MdOutlineArrowRight } from "react-icons/md";

interface ViewIngredientProps {
  ingreName: string;
  amount: string;
  ingredientID: number;
}

const Container = styled.div`
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const IngredList = styled.ul``;

const IngredItem = styled.li`
  display: flex;
  align-items: center;
  line-height: 2;
`;
const Span = styled.span`
  font-weight: 600;
  font-size: 17px;
`;
// const data = [
//   { recipeID: 1, ingreName: "감자", amount: "2개" },
//   { recipeID: 2, ingreName: "양파", amount: "2개" },
//   { recipeID: 3, ingreName: "애호박", amount: "300g" },
//   { recipeID: 4, ingreName: "대파", amount: "400g" },
//   { recipeID: 5, ingreName: "파프리카", amount: "100g" },
// ];

export default function ViewIngredient({
  value,
}: {
  value: ViewIngredientProps[];
}) {
  return (
    <Container>
      <HeadingAtom level={3} $marginBottom="10px">
        필요한 재료
      </HeadingAtom>
      <IngredList>
        {value !== undefined && value.map((item) => (
          <IngredItem key={item.ingredientID}>
            <MdOutlineArrowRight size={25} color={"#FE8D00"} />
            <Span>{item.ingreName}</Span>_ {item.amount}
          </IngredItem>
        ))}
      </IngredList>
    </Container>
  );
}
