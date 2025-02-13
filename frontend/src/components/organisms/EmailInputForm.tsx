import React, { useRef, useState } from "react";
import styled from "styled-components";
import InputField from "../molecules/InputField";
import ButtonAtom from "../atoms/ButtonAtom";
import { PasswordResetContext } from "../pages/PasswordResetPage";
import { useContext } from "react";
import TextInputForm from "../atoms/TextInputForm";
import { Container } from "@chakra-ui/react";
import axios from "axios";

const EmailInputForm = () => {
  function isEmail(value: string): boolean {
    // 이메일 형식 정규식 (간단한 예시)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }

  function isDate(value: string): boolean {
    // 날짜 형식 정규식 (YYYY-MM-DD 형식 체크)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(value);
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passwordcontext?.email != undefined &&
      passwordcontext?.birthday != undefined &&
      isEmail(passwordcontext?.email) == true &&
      isDate(passwordcontext?.birthday) == true
    ) {
      const forming = await axios({
        method: "POST",
        url: "/user/userselect",
        withCredentials: true,
        data: {
          userID: passwordcontext?.email,
          birthday: passwordcontext?.birthday,
        },
      });
      if (forming.data.result == true) {
        alert("인증번호를 입력해주세요.");
        passwordcontext?.setStep(2);
      } else {
        alert(forming.data.message);
      }
    } else {
      alert("이메일과 생년월일의 형식이 맞지 않습니다.");
    }
  };
  const passwordcontext = useContext(PasswordResetContext);

  const StyleButton = styled(ButtonAtom)`
    position: relative;
    bottom: 0;
  `;
  return (
    <Container>
      {passwordcontext ? (
        <form onSubmit={handleEmailSubmit}>
          <TextInputForm
            placeholder="이메일을 입력하세요"
            label="이메일"
            value={passwordcontext?.email}
            setValue={passwordcontext?.setEmail}
          />
          <TextInputForm
            placeholder="생년월일을 입력하세요"
            label="생년월일"
            value={passwordcontext?.birthday}
            setValue={passwordcontext?.setbirthday}
          />
          <StyleButton text="확인" buttontype="confirm" type="submit" />
        </form>
      ) : (
        <div>변경하기 위한 setstate를 불러오지 못함</div>
      )}
    </Container>
  );
};

export default EmailInputForm;
