import React, { useState } from "react";
import styled from "styled-components";

import TextInputForm from "../atoms/TextInputForm";
import PasswordInputForm from "../atoms/PasswordInputForm";
import ThreeSelectBlockUi from "../molecules/ThreeSelectBlockUI";
import SelectBlockUi from "../molecules/SelectBlockUi";
import ButtonAtom from "../atoms/ButtonAtom";
import Header from "../organisms/Header";
import axios from "axios";
import Notification from "../organisms/Notification";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  height: 100vh;
  position: relative;
`;
const InputWrap = styled.form`
  padding-top: 40px;
`;

export default function SignUp() {
  const naviagte = useNavigate();
  const [alertDisplay, setAlertDisplay] = useState(false);
  const [message, setMessage] = useState(["", ""]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState({
    option1: "",
    option2: "",
    option3: "",
  });
  const [genderState, setGenderState] = useState("");
  const [invalid, setInvalid] = useState(false);

  const gender = [
    {
      label: `남성`,
      value: `male`,
    },
    {
      label: `여성`,
      value: `female`,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setInvalid(false);
    } else {
      setInvalid(true);
      return;
    }

    const data = axios({
      method: "POST",
      url: `${process.env.REACT_APP_ROUTE}/user/signup`,
      data: {
        name: name,
        userid: email,
        pw: password,
        birthday: `${birthDate.option1}-${birthDate.option2}-${birthDate.option3}`,
        gender: genderState,
      },
      withCredentials: true,
    }).then((response) => {
      const title = response.data.message[0];
      const detailMessage = response.data.message[1];
      setMessage([title, detailMessage]);
      // alert(response.data.message);
      setAlertDisplay(!alertDisplay);
    });
  };

  return (
    <Container>
      {/* 로고 */}
      <Header hide={true} />
      {/* 입력양식 */}
      <InputWrap onSubmit={handleSubmit}>
        {/* 이름 */}
        <TextInputForm
          placeholder="이름 혹은 닉네임을 입력하세요"
          label="이름"
          value={name}
          setValue={setName}
        />
        {/* 이메일 */}
        <TextInputForm
          placeholder="이메일을 입력하세요"
          label="이메일"
          value={email}
          setValue={setEmail}
          invalid={invalid}
        />
        {/* 패스워드 */}
        <PasswordInputForm
          placeholder="패스워드를 입력하세요"
          label="비밀번호"
          value={password}
          setValue={setPassword}
        />
        {/* 생년월일 */}
        <ThreeSelectBlockUi
          title="생년월일"
          values={birthDate}
          setValues={setBirthDate}
          placeholder1="년 "
          placeholder2="월 "
          placeholder3="일 "
          type="type1"
        />
        {/* 성별 */}
        <SelectBlockUi
          OptionState={genderState}
          setOptionState={setGenderState}
          Data={gender}
          placeholder="성별을 입력해주세요"
          title={"성별"}
        />
        {/* 회원가입 버튼 */}
        <ButtonAtom
          text="회원가입"
          buttontype="signUp"
          type="submit"
          onClick={() => setAlertDisplay(!alertDisplay)}
        />
      </InputWrap>

      <Notification
        title={message[0]}
        message={message[1]}
        type="success"
        onConfirm={() => {
          if (message[0] === "회원가입 성공") {
            naviagte("/login");
            setAlertDisplay(!alertDisplay);
          } else {
            setAlertDisplay(!alertDisplay);
          }
        }}
        alertDisplay={alertDisplay}
      />
    </Container>
  );
}
