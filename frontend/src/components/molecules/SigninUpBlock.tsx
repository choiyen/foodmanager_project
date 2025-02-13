import React from "react";
import styled from "styled-components";
import ButtonAtom from "../atoms/ButtonAtom";
import { Link } from "react-router-dom";

const SignUpButton = styled(Link)`
  margin-top: 10px;
  text-decoration: underline;
  color: #121212;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export default function SigninUpBlock() {
  return (
    <Container>
      <ButtonAtom text="로그인" buttontype="login" type="submit" />
      <SignUpButton to="/findpw">비밀번호 찾기</SignUpButton>
      <SignUpButton to="/signUp">회원가입</SignUpButton>
    </Container>
  );
}
