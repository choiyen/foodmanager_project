import React, { useState } from "react";
import styled from "styled-components";
import IconButtonAtom from "../atoms/IconButtonAtom";
import SwitchTab from "../molecules/SwitchTab";
import WritePostTab from "./WritePostTab";
import WriteFoodTab from "./WriteFoodTab";
import WriteAddFood from "./WriteAddFood";


interface InputModalProps {
  $isOpen: boolean;
  onClose: () => void;
  selected: number;
  setSelected: (e: number) => void;
}

const ModalPage = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  bottom: 0;
  background-color: #2b2b2bc7;
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  transition-duration: 500ms;
  @media (min-width: 768px) {
    transform: translateX(-20px);
  }
`;

const ModalContent = styled.div<{ $isOpen: boolean }>`
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  z-index: 10;
  width: 100vw;
  max-width: 700px;
  height: 95%;
  background-color: #ffffff;
  top: ${({ $isOpen }) => ($isOpen ? "5%" : "100%")};
  transition-duration: 500ms;
  border-radius: 20px 20px 0 0;
  padding: 10px;
  padding-top: 50px;
`;

export default function InputModal({
  $isOpen,
  onClose,
  selected,
  setSelected,
}: InputModalProps) {
  // const [selected, setSelected] = useState(1); // 탭전환


  const render = () => {
    switch (selected) {
      case 1:
        return <WritePostTab onClose={onClose} />;
      case 2:
        return <WriteFoodTab onClose={onClose} setSelected={setSelected} />;
      case 3:
        return <WriteAddFood onClose={onClose} />;
    }
  };


  return (
    <ModalPage $isOpen={$isOpen}>
      <ModalContent $isOpen={$isOpen}>
        <IconButtonAtom
          label="닫기버튼"
          icontype="ex"
          variant="solid"
          BGcolor="null"
          color="#404040"
          size="32px"
          onClick={onClose}
          position="absolute"
          right="10px"
          top="10px"
        />
        <SwitchTab
          menu1="게시글 작성"
          menu2="음식 기록"
          menu3="재료 추가"
          selected={selected}
          setSelected={setSelected}
        />
        {render()}
      </ModalContent>
    </ModalPage>
  );
}
