import React from "react";
import styled, { keyframes } from "styled-components";
import LogoImg from "../atoms/LogoImg";
import ImageCard from "../atoms/ImageCard";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 99;
`;

const LogoWrap = styled.div`
  text-align: center;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
`;

const ImageStyle = styled(ImageCard)`
  margin-bottom: 30px;
  transform: translateX(-20%);
  margin: 0 auto;
`;

const doAnimation = keyframes`
0% {content: ".";}
25% {content: "..";}
50% {content: "...";}
75% {content: "..";}
100% {content: ".";}
`;
const Span = styled.span`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  display: block;

  &:after {
    display: inline-block;
    animation: ${doAnimation} 1.5s infinite;
    content: ".";
  }
`;

export default function Logo() {
  return (
    <Container>
      <LogoWrap>
        <ImageStyle src="/LogoImg.png" alt="로고 이미지" />
        <LogoImg large={true} />
        <Span>로딩중</Span>
      </LogoWrap>
    </Container>
  );
}
