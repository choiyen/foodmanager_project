import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IngredientInfo from "./IngredientInfo";
import { IoWarning } from "react-icons/io5";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BsFillPatchCheckFill } from "react-icons/bs";
import IconButtonAtom from "../atoms/IconButtonAtom";
import Notification from "../organisms/Notification";
import axios from "axios";
import { usePageRender } from "../organisms/PageRenderContext";

interface IngredientData {
  id: number;
  $img: number;
  kindFood: string;
  unit: string;
  amount: number;
  expiration: string;
  $remainDate: number;
}

const CloseButton = styled(IconButtonAtom)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const Container = styled.div<{ $img: number; $remainDate: number }>`
  background-color: ${({ $remainDate }) =>
    $remainDate <= 0 ? "#980d0d" : "#ffffff"};
  position: relative;
  width: 350px;
  height: 120px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 124px;
  background-image: ${({ $img }) =>
    `url('${process.env.PUBLIC_URL}/ingredients/${$img}.png')`};
  background-repeat: no-repeat;
  background-size: 70px;
  background-position: 10% center;

  @media (min-width: 768px) {
    padding-left: 130px;
    width: 450px;
    height: 150px;
  }

  @media (min-width: 1024px) {
    width: 45%;
    height: 250px;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 30px;
    justify-content: flex-end;
    background-size: 100px;
    background-position: center 30px;
  }
`;
const ExBox = styled.div<{ $remainDate: number }>`
  position: absolute;
  right: 50px;
  width: 55px;
  font-size: 14px;
  color: ${({ $remainDate }) => ($remainDate <= 0 ? "#ffffff" : "#bbbbbb")};
  font-weight: 600;
  display: grid;
  gap: 5px;
  justify-items: center;
  justify-content: center;
  @media (min-width: 1024px) {
    top: 20px;
    left: 20px;
    justify-content: start;
  }
`;
export default function IngredientBlock({
  id,
  $img,
  kindFood,
  unit,
  amount,
  expiration,
  $remainDate,
}: IngredientData) {
  const [display, setDisplay] = useState(false);
  const { groceryPageRender, setGroceryPageRender } = usePageRender();

  const renderingIcon = () => {
    if ($remainDate > 7) {
      return <BsFillPatchCheckFill size={35} color="#64A70B" />;
    } else if ($remainDate > 3) {
      return <BsFillQuestionCircleFill size={35} color="#FE8D00" />;
    } else {
      return <IoWarning size={35} color="#FF5E57" />;
    }
  };

  const Alert = () => {
    setDisplay((prev) => !prev);
  };

  const route = process.env.REACT_APP_ROUTE;
  const DeleteGrocery = () => {
    const data = axios({
      method: "delete",
      url: `${route}/grocery/delete/${id}`,
      withCredentials: true,
    })
      .then((response) => {
        // 필요한 후속 작업 추가
        setDisplay((prev) => !prev);
        setGroceryPageRender((prev) => !prev);
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
      });
  };

  return (
    <Container $img={$img} $remainDate={$remainDate}>
      <CloseButton
        label="닫기 버튼"
        icontype="ex"
        color="#dddddd"
        size="25px"
        onClick={Alert}
      />
      {display ? (
        <Notification
          title="재료 삭제"
          message="재료를 지우시겠습니까?"
          type="info"
          onConfirm={DeleteGrocery}
          onCancel={() => {
            setDisplay((prev) => !prev);
          }}
          alertDisplay={display}
        />
      ) : (
        <></>
      )}
      <IngredientInfo
        kindFood={kindFood}
        unit={unit}
        amount={amount}
        expiration={expiration}
        $remainDate={$remainDate}
      />
      <ExBox $remainDate={$remainDate}>
        {renderingIcon()}D -{" "}
        {$remainDate >= 99
          ? "99+"
          : $remainDate === 0
          ? "day"
          : $remainDate < 0
          ? "over"
          : $remainDate}
      </ExBox>
    </Container>
  );
}
