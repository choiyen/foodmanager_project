import React from "react";
import styled from "styled-components";

import ViewImage from "../molecules/ViewImage";
import ViewIconWrap from "../molecules/ViewIconWrap";
import ViewRecipeHead from "../molecules/ViewRecipeHead";
interface RecipeDataProps {
  title: string;
  describe: string;
  time: string;
  amount: string;
  level: string;
  img: string;
}

const RecipeInfo = styled.section`
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export default function ViewRecipeInfo({ value }: { value: RecipeDataProps }) {
  const shouldShowIcons =
    value.time !== "" && value.amount !== "" && value.level !== "";

  return (
    <div>
      {/* 최상단 메인 이미지 */}
      <ViewImage value={value.img} />

      <RecipeInfo>
        {/* 시계, 인분, 난이도 아이콘 */}
        {shouldShowIcons && (
          <ViewIconWrap
            time={value.time}
            mealCount={value.amount}
            level={value.level}
          />
        )}
        {/* 제목과 상세정보 부분 */}
        <ViewRecipeHead title={value.title} describe={value.describe} />
      </RecipeInfo>
    </div>
  );
}
