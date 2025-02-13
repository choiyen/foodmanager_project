import React, { useState } from "react";
import styled from "styled-components";
import SelectBlockUi from "../molecules/SelectBlockUi";
import TextInputForm from "../atoms/TextInputForm";
import ThreeSelectBlockUi from "../molecules/ThreeSelectBlockUI";
import ButtonAtom from "../atoms/ButtonAtom";
import TwoTextInputForm from "../atoms/TwoTextInputForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePageRender } from "./PageRenderContext";
import { Alert } from "../ui/alert";
import { LuTerminal } from "react-icons/lu";

const Container = styled.form``;
const InputWrap = styled.form``;

export default function WriteAddFood({ onClose }: { onClose: () => void }) {
  const [kindOfFood, setkindOfFood] = useState("");
  const [nameOfFood, setnameOfFood] = useState("");
  const [foodAmount, setfoodAmount] = useState("1");
  const [foodUnit, setFoodUnit] = useState("");
  const [Data, setData] = useState({
    option1: "",
    option2: "",
    option3: "",
  });
  const navigate = useNavigate();
  // 컨텍스트 사용
  const { groceryPageRender, setGroceryPageRender } = usePageRender();

  const kindOfFoodData = [
    {
      label: `신선식품`,
      value: `1`,
    },
    {
      label: `곡물 및 견과류`,
      value: `2`,
    },
    {
      label: `가공 및 저장식품`,
      value: `3`,
    },
    {
      label: `유제품`,
      value: `4`,
    },
    {
      label: `음료`,
      value: `5`,
    },
    {
      label: `기타`,
      value: `6`,
    },
  ];
  // [category, groceryname, amount, unit, expiration ]
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = axios({
      method: "POST",
      url: `${process.env.REACT_APP_ROUTE}/grocery/post`,
      data: {
        category: kindOfFood,
        groceryname: nameOfFood,
        amount: foodAmount,
        unit: foodUnit,
        expiration: `${Data.option1}-${Data.option2}-${Data.option3}`,
      },
      withCredentials: true,
    })
      .then((res) => {
        alert(res.data.message);
        onClose();
        setGroceryPageRender((prev) => !prev);
      })
      .catch((err) => {
        console.error(
          "데이터 등록 실패",
          err.response ? err.response.data : err.message
        );
        alert(
          err.response
            ? err.response.data.message
            : "서버와의 연결이 실패했습니다."
        );
        err.response.data.message === "로그인이 되어 있지 않습니다." &&
          navigate("/login");
      });
  };
  return (
    <Container onSubmit={handleSubmit}>
      <SelectBlockUi
        OptionState={kindOfFood}
        setOptionState={setkindOfFood}
        Data={kindOfFoodData}
        placeholder="재료의 종류를 선택하세요"
        title={"재료의 종류?"}
      />
      <TextInputForm
        placeholder="재료 이름을 입력하세요"
        label="재료 이름"
        value={nameOfFood}
        setValue={setnameOfFood}
      />
      <TwoTextInputForm
        label="재료 양"
        placeholder1="숫자를 입력해주세요"
        placeholder2="단위를 입력해주세요"
        value1={foodAmount}
        value2={foodUnit}
        setValue1={setfoodAmount}
        setValue2={setFoodUnit}
      />
      <ThreeSelectBlockUi
        title="유통기한"
        placeholder1="연 "
        placeholder2="월 "
        placeholder3="일 "
        type="type3"
        values={Data}
        setValues={setData}
      />
      <ButtonAtom text="업로드" buttontype="upload" type="submit" />
    </Container>
  );
}
