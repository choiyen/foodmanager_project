import React, { useState } from "react";
import styled from "styled-components";
import FoodInfo from "./FoodInfo";
import IconButtonAtom from "../atoms/IconButtonAtom";
import Notification from "../organisms/Notification";
import axios from "axios";
import { usePageRender } from "../organisms/PageRenderContext";

interface FoodBlockProps {
  id: number;
  $img: number;
  kindFood: string;
  foodName: string;
  kcal: number;
}

const CloseButton = styled(IconButtonAtom)`
  position: absolute;
  top: 8px;
  right: 8px;
`;
const Container = styled.div<{ $img: number }>`
  position: relative;
  width: 350px;
  height: 120px;
  padding-left: 30px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  background-image: ${({ $img }) =>
    `url('${process.env.PUBLIC_URL}/menu/${$img}.png')`};
  background-repeat: no-repeat;
  background-size: 70px;
  background-position: 80% center;

  @media (min-width: 768px) {
    width: 450px;
    height: 150px;
  }
  @media (min-width: 1024px) {
    width: 40%;
    flex-direction: column;
    padding: 0 0 30px 0;
    justify-content: flex-end;
    height: 300px;
    text-align: center;
    background-size: 100px;
    background-position: center 30%;
  }
`;

export default function FoodBlock({
  id,
  $img,
  kindFood,
  foodName,
  kcal,
}: FoodBlockProps) {
  const { pageRender, setPageRender, startDate, setStartDate } =
    usePageRender();
  const [display, setDisplay] = useState(false);
  const Alert = () => {
    setDisplay((prev) => !prev);
  };
  const route = process.env.REACT_APP_ROUTE;

  const DeleteFood = () => {
    const data = axios({
      method: "delete",
      url: `${route}/foodlog/delete/${startDate}/${id}`,
      withCredentials: true,
    })
      .then((response) => {
        // 필요한 후속 작업 추가
        setDisplay((prev) => !prev);
        setPageRender((prev) => !prev);
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
      });
  };
  return (
    <Container $img={$img}>
      <FoodInfo kindFood={kindFood} foodName={foodName} kcal={kcal} />
      <CloseButton
        label="닫기 버튼"
        icontype="ex"
        color="#dddddd"
        size="25px"
        onClick={Alert}
      />
      <Notification
        title="음식 삭제"
        message="음식을 지우시겠습니까?"
        type="info"
        onConfirm={DeleteFood}
        onCancel={() => {
          setDisplay((prev) => !prev);
        }}
        alertDisplay={display}
      />
    </Container>
  );
}
