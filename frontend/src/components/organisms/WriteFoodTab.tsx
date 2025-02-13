import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectBlockUi from "../molecules/SelectBlockUi";
import TextInputForm from "../atoms/TextInputForm";
import ButtonAtom from "../atoms/ButtonAtom";
import TwoTextInputForm from "../atoms/TwoTextInputForm";
import ReactDataPicker from "../atoms/ReactDataPicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePageRender } from "./PageRenderContext"; // 작성한 PageRenderContext 파일

const Container = styled.form``;
const CalenderWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;
const InputWrap = styled.form``;

export default function WriteFoodTab({
  onClose,
  setSelected,
}: {
  onClose: () => void;
  setSelected: (e: number) => void;
}) {
  const [TimeState, setTimeState] = useState<string | null>("");
  const [KindOfFood, setKindOfFood] = useState<string | null>("");
  const [foodName, setFoodName] = useState("");
  const [foodAmount, setfoodAmount] = useState("1");
  const [foodUnit, setFoodUnit] = useState("");
  const [kcal, setKcal] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const navigate = useNavigate();

  // 컨텍스트 사용
  const { pageRender, setPageRender } = usePageRender();

  const togglePageRender = () => {
    setPageRender(!pageRender);
  };
  const time = [
    {
      label: `아침`,
      value: `Breakfast`,
    },
    {
      label: `점심`,
      value: `Lunch`,
    },
    {
      label: `저녁`,
      value: `Dinner`,
    },
    {
      label: `간식`,
      value: `Snack`,
    },
    {
      label: `야식`,
      value: `Night`,
    },
  ];

  const kindOfFoodData = [
    {
      label: `치킨`,
      value: `1`,
    },
    {
      label: `중식`,
      value: `2`,
    },
    {
      label: `일식`,
      value: `3`,
    },
    {
      label: `패스트푸드(피자, 햄버거) `,
      value: `4`,
    },
    {
      label: `찜 & 탕`,
      value: `5`,
    },
    {
      label: `고기(족발.보쌈.삼겹살)`,
      value: `6`,
    },
    {
      label: `분식`,
      value: `7`,
    },
    {
      label: `카페 & 디저트`,
      value: `8`,
    },
    {
      label: `한식`,
      value: `9`,
    },
    {
      label: `양식`,
      value: `10`,
    },
    {
      label: `아시안`,
      value: `11`,
    },
    {
      label: `도시락`,
      value: `12`,
    },
    {
      label: `샐러드`,
      value: `13`,
    },
    {
      label: `과자`,
      value: `14`,
    },
    {
      label: `기타`,
      value: `15`,
    },
  ];
  const date = new Date(startDate + "");
  // 날짜 정보 추출
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // 날짜 결과
  const formattedDate = `${year}-${month}-${day}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = axios({
      method: "POST",
      url: `${process.env.REACT_APP_ROUTE}/foodlog/post`,
      data: {
        category: KindOfFood,
        foodname: foodName,
        amount: foodAmount,
        unit: foodUnit,
        kcal: kcal,
        mealtype: TimeState,
        when: formattedDate,
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data.result == true) {
        alert("성공적으로 정보가 저장되었습니다.");
        onClose(); // 자동으로 입력창 닫기
        togglePageRender(); // 컨텍스트를 활용한 영양소 페이지 강제 재 렌더링
        //setTimeState setKindOfFood setFoodName setfoodAmount setFoodUnit setKcal
      } else {
        if (res.data.message == "로그인이 되어 있지 않습니다.") {
          navigate("/login");
        } else {
          alert(res.data.message);
          alert("제대로된 음식 정보가 아닙니다.");
        }
      }
    });
  };

  return (
    <Container onSubmit={handleSubmit}>
      <CalenderWrap>
        <ReactDataPicker startDate={startDate} setStartDate={setStartDate} />
      </CalenderWrap>
      <SelectBlockUi
        OptionState={TimeState}
        setOptionState={setTimeState}
        Data={time}
        placeholder="식사 시간대를 선택하세요"
        title={"언제 드셨나요?"}
      />
      <SelectBlockUi
        OptionState={KindOfFood}
        setOptionState={setKindOfFood}
        Data={kindOfFoodData}
        placeholder="음식의 종류를 선택하세요"
        title={"음식의 종류"}
      />
      <TextInputForm
        placeholder="음식 이름을 입력하세요"
        label="음식 이름"
        value={foodName}
        setValue={setFoodName}
      />
      <TwoTextInputForm
        label="음식 양"
        placeholder1="숫자를 입력해주세요"
        placeholder2="단위를 입력해주세요"
        value1={foodAmount}
        value2={foodUnit}
        setValue1={setfoodAmount}
        setValue2={setFoodUnit}
      />
      <TextInputForm
        placeholder="입력하지 않으시면 AI가 자동으로 추정합니다."
        label="칼로리(선택)"
        value={kcal}
        setValue={setKcal}
        required={false}
      />
      <ButtonAtom text="업로드" buttontype="upload" type="submit" />
    </Container>
  );
}
