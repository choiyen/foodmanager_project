import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FoodBlock from "../molecules/FoodBlock";
import IngredientBlock from "../molecules/IngredientBlock";
import axios from "axios";

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
interface IngredientData {
  id: number;
  $img: number;
  kindFood: string;
  amountFood: string;
  ExDate: string;
  $remainDate: string | number;
}

const FoodList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`;

export default function FoodBlockList({
  type,
  foodLog,
  groceryData,
}: {
  type: "ingredient" | "food";
  foodLog?: FoodLog[];
  groceryData?: GroceryItem[];
}) {
  const [Loading, setLoading] = useState(false);

  const kindOfFood = [
    "",
    `치킨`,
    `중식`,
    `일식`,
    `패스트푸드`,
    `찜 & 탕`,
    `고기`,
    `분식`,
    `카페 & 디저트`,
    `한식`,
    `양식`,
    `아시안`,
    `도시락`,
    `샐러드`,
    `과자`,
    `기타`,
  ];

  // const IngredientData = [
  //   {
  //     id: 1,
  //     $img: 1,
  //     kindFood: "신선식품",
  //     amountFood: "1개",
  //     ExDate: "2025/03/15",
  //     $remainDate: 10,
  //   },
  // ];

  // 날짜 계산 함수
  const CalculateDate = (
    Exdate: string
  ): [expiration: string, $remainDate: number] => {
    const todayDate = new Date(); // 오늘 날짜
    const date = new Date(Exdate); // DB에 저장된 유통기한

    // 유통기한 표기 보기 좋게 정리
    const year = date.getFullYear(); // 유통기한 연도 추출
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 추출
    const day = String(date.getDate()).padStart(2, "0"); // 일 추출
    const expiration = `${year} / ${month} / ${day}`; // 보기 좋게 정리

    // 오늘 기준 남은 시간 계산
    const remainSecond = date.getTime() - todayDate.getTime(); // second로 계산
    let $remainDate = Math.ceil(remainSecond / (1000 * 60 * 60 * 24)); // 날짜로 변환
    $remainDate = $remainDate > 99 ? 99 : $remainDate; // 100 이상은 99+ 로 처리
    return [expiration, $remainDate];
  };
  return (
    <div>
      {Loading ? (
        <p>Loading...</p>
      ) : (
        <FoodList>
          {type === "food"
            ? foodLog &&
              foodLog.map((food) => (
                <FoodBlock
                  key={food.logID}
                  id={food.logID}
                  $img={food.category}
                  foodName={food.foodname + " _ " + food.amount + food.unit}
                  kindFood={kindOfFood[food.category]}
                  kcal={food.kcal}
                />
              ))
            : groceryData &&
              groceryData.map((groceryData) => {
                // 유통기한과 남은 날짜 계산해서 map에 넣어 돌린다.
                const [expiration, $remainDate] = CalculateDate(
                  groceryData.expiration
                );
                return (
                  <IngredientBlock
                    key={groceryData.groceryID}
                    id={groceryData.groceryID}
                    $img={groceryData.category}
                    kindFood={groceryData.groceryname}
                    unit={groceryData.unit}
                    amount={groceryData.amount}
                    expiration={expiration}
                    $remainDate={$remainDate}
                  />
                );
              })}
        </FoodList>
      )}
    </div>
  );
}
