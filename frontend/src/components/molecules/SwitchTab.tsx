import { table } from "console";
import React, { useState } from "react";
import styled from "styled-components";

interface SwitchTabProps {
  menu1: string;
  menu2: string;
  menu3?: string;
  $ThreeMenu?: boolean;
  selected: number;
  setSelected: (num: number) => void;
  className?: string;
  $buttonStyle?: "style1" | "style2";
}

const Container = styled.div<{
  $ThreeMenu?: boolean;
  $buttonStyle?: "style1" | "style2";
}>`
  height: 44px;
  border-bottom: ${({ $buttonStyle }) =>
    $buttonStyle === "style1" ? "2px solid #e2e2e2" : "none"};
  display: flex;
  justify-content: ${({ $ThreeMenu }) =>
    $ThreeMenu ? "space-around" : "center"};
  margin-top: ${({ $buttonStyle }) =>
    $buttonStyle === "style1" ? "0px" : "20px"};

  @media (min-width: 768px) {
    height: 60px;
  }
`;

const ButtonTab = styled.button<{
  $ThreeMenu?: boolean;
  $buttonStyle?: "style1" | "style2";
}>`
  height: 100%;
  width: ${({ $ThreeMenu }) => ($ThreeMenu ? "25%" : "35%")};
  max-width: 300px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: ${({ $buttonStyle }) =>
    $buttonStyle === "style1" ? "2px solid #121212" : "none"};
  color: #121212;
  cursor: default;
  background-color: ${({ $buttonStyle }) =>
    $buttonStyle === "style1" ? "transparent" : "#EBEBEB"};
  border-radius: ${({ $buttonStyle }) =>
    $buttonStyle === "style1" ? "0px" : "10px"};
`;
const DeSelectButton = styled(ButtonTab)`
  border-bottom: 2px solid #e2e2e2;
  font-weight: bold;
  color: #e2e2e2;
  cursor: pointer;
  background-color: transparent;
  border-bottom: none;
`;

export default function SwitchTab({
  menu1,
  menu2,
  menu3,
  $ThreeMenu = false,
  selected,
  setSelected,
  className,
  $buttonStyle = "style1",
}: SwitchTabProps) {
  if (!menu3) {
    $ThreeMenu = false;
  } else {
    $ThreeMenu = true;
  }

  const ClickTab = (num: number): void => {
    setSelected(num);
  };

  return (
    <Container
      $ThreeMenu={$ThreeMenu}
      className={className}
      $buttonStyle={$buttonStyle}
    >
      {selected === 1 ? (
        <ButtonTab
          $ThreeMenu={$ThreeMenu}
          className={className}
          $buttonStyle={$buttonStyle}
        >
          {menu1}
        </ButtonTab>
      ) : (
        <DeSelectButton
          $ThreeMenu={$ThreeMenu}
          onClick={() => ClickTab(1)}
          className={className}
        >
          {menu1}
        </DeSelectButton>
      )}
      {selected === 2 ? (
        <ButtonTab
          $ThreeMenu={$ThreeMenu}
          className={className}
          $buttonStyle={$buttonStyle}
        >
          {menu2}
        </ButtonTab>
      ) : (
        <DeSelectButton
          $ThreeMenu={$ThreeMenu}
          onClick={() => ClickTab(2)}
          className={className}
        >
          {menu2}
        </DeSelectButton>
      )}

      {$ThreeMenu &&
        (selected === 3 ? (
          <ButtonTab
            $ThreeMenu={$ThreeMenu}
            className={className}
            $buttonStyle={$buttonStyle}
          >
            {menu3}
          </ButtonTab>
        ) : (
          <DeSelectButton $ThreeMenu={$ThreeMenu} onClick={() => ClickTab(3)}>
            {menu3}
          </DeSelectButton>
        ))}
    </Container>
  );
}
