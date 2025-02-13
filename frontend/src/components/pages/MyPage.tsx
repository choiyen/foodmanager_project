import React from "react";
import styled from "styled-components";
import Header from "../organisms/Header";
import NavBar from "../organisms/NavBar";
import MyPageTemplate from "../templates/MyPageTemplate";

const Container = styled.div`
  height: 100vh;
`;

export default function MyPage() {
  return (
    <Container>
      <Header />
      <MyPageTemplate />
      <NavBar />
    </Container>
  );
}
