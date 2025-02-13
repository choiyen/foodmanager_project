import React, { useEffect } from "react";
import styled from "styled-components";
import BackButton from "../atoms/BackButton";
import ViewRecipeInfo from "../organisms/ViewRecipeInfo";
import ViewIngredient from "../organisms/ViewIngredient";
import ViewCookingStep from "../organisms/ViewCookingStep";
import { Rating } from "../ui/rating";
import { useState } from "react";
import axios from "axios";

interface Ingredient {
  ingredientID: number; // 해당 레시피 ID (참조)
  ingreName: string; // 재료 이름
  amount: string; // 재료 양
}

// 하나의 조리 단계 타입 정의
interface CookingStep {
  stepNo: string; // 단계 번호
  content: string; // 단계 설명
}

// 레시피 전체 정보 타입 정의
interface RecipeData {
  type: string;
  recipeID: number; // 레시피 ID
  title: string; // 레시피 이름
  describe: string; // 상세 설명
  img: string; // 이미지 URL
  time: string; // 조리 시간
  amount: string; // 몇 인분인지
  level: string; // 난이도
  ingredients: Ingredient[]; // 재료 리스트
  steps: CookingStep[]; // 조리 단계 리스트
}

// interface DefaultData {
//   recipeSEQ: number;
//     title: string;
//     img: string;
//     describe: string;
//     category: string;
//     ingredients: Ingredient[];
//     steps: CookingStep[];
// }

const Container = styled.div`
  margin-bottom: 200px;
  position: relative;
  background-color: #ffffff;

  @media (min-width: 768px) {
    width: 50vw;
    margin: 0 auto;
    margin-bottom: 200px;
  }
`;

const ButtonStyle = styled(BackButton)`
  background-color: white;
  border-radius: 50%;
  top: 30px;
  @media (min-width: 768px) {
    left: 10px;
  }
`;
const StarStyle = styled(Rating)`
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -70px; */

  position: fixed;
  height: 50px;
  bottom: 70px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #ffffff;

  @media (min-width: 768px) {
    bottom: 0;
  }
`;
const route = process.env.REACT_APP_ROUTE;
export default function ViewTemplateRecipe({
  RecipeData,
  starValue,
  setStarValue,
  id,
}: {
  RecipeData: RecipeData;
  starValue: number;
  setStarValue: (e: number) => void;
  id: string | undefined;
}) {
  const [isNewData, setisNewData] = useState(false); // 별점을 수정해야하나 추가해야하나 판단하는 state

  const ChangeStar = (value: number) => {
    axios({
      method: "get",
      url: `${route}/recipe/get/review`,
      withCredentials: true,
      params: {
        recipeID: id,
      },
    }).then((res) => {
      const isNewData = res.data.result; // 응답 결과를 바로 사용

      if (isNewData) {
        // 이미 별점을 준 적이 있음
        axios({
          method: "patch",
          url: `${route}/recipe/update/review`,
          withCredentials: true,
          data: {
            recipeID: id,
            rating: value,
          },
        }).then((res) => {
          alert(res.data.Message);
        });
      } else {
        // 별점을 처음 등록하는 경우
        axios({
          method: "post",
          url: `${route}/recipe/insert/review`,
          withCredentials: true,
          data: {
            recipeID: RecipeData.recipeID,
            rating: value,
          },
        }).then((res) => {
          alert(res.data.Message);
        });
      }
    });
  };

  return (
    <Container>
      <ButtonStyle position="absolute" />
      <ViewRecipeInfo value={RecipeData} />
      <ViewIngredient value={RecipeData.ingredients || []} />
      <ViewCookingStep value={RecipeData.steps || []} />
      {RecipeData.type === "recipe" && (
        <StarStyle
          size="lg"
          value={starValue}
          onValueChange={(e) => {
            setStarValue(e.value);
            ChangeStar(e.value);
          }}
          colorPalette="orange"
          // onClick={() => ChangeStar()}
        />
      )}
    </Container>
  );
}
