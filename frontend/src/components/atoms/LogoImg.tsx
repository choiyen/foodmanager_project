import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface LogoProps {
  large?: boolean;
}

const Logo = styled(Link)<LogoProps>`
  font-family: "Recipekorea", sans-serif;
  cursor: pointer;
  display: block;
  font-size: 24px;
  color: #fe8d00;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const MainLogo = styled.h1<LogoProps>`
  font-family: "Recipekorea", sans-serif;
  display: inline-block;
  font-size: 64px;
  color: #fe8d00;
`;

export default function LogoImg({ large }: LogoProps) {
  return (
    <>
      {large ? <MainLogo>한끼출근</MainLogo> : <Logo to="/main">한끼출근</Logo>}
    </>
  );
}
