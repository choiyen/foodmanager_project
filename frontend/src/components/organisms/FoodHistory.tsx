import React from "react";
import styled from "styled-components";
import HeadingAtom from "../atoms/HeadingAtom";
import FoodBlockList from "./FoodBlockList";
interface FoodLog {
  amount: number;
  category: number;
  foodname: string;
  kcal: number;
  logID: number;
  mealtype: string;
  unit: string;
  userID: string;
  when: string;
}
interface GroceryItem {
  amount: number; // 수량
  category: number; // 카테고리 (id 또는 index로 보임)
  expiration: string; // 유통기한 (ISO8601 형식의 문자열)
  groceryID: number; // 식료품 고유 ID
  groceryname: string; // 식료품 이름
  unit: string; // 단위 (예: 마리, 개 등)
  userID: string; // 사용자 ID
}
interface FoodHistoryProps {
  category: string;
  type: "ingredient" | "food";
  foodLog?: FoodLog[];
  groceryData?: GroceryItem[];
}

const Container = styled.div`
  padding: 20px;
  margin-bottom: 50px;

  @media (min-width: 768px) {
    width: 50vw;
    margin: 0 auto;
  }
`;

const HeadingName = styled(HeadingAtom)`
  font-size: 20px;
  margin-bottom: 20px;
`;

export default function FoodHistory({
  category,
  type,
  foodLog,
  groceryData,
}: FoodHistoryProps) {
  return (
    <Container>
      <HeadingName
        level={2}
        color="#121212"
        // $marginBottom={introduce ? "0px" : "20px"}
      >
        {category}
      </HeadingName>

      <FoodBlockList type={type} foodLog={foodLog} groceryData={groceryData} />
    </Container>
  );
}
