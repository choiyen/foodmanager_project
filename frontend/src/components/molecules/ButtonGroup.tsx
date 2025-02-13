import React from "react";
import styled from "styled-components";
import ButtonAtom from "../atoms/ButtonAtom";

interface ButtonGroupProps {
  onConfirm: () => void;
  onCancel?: () => void;
}

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
//   padding: 10px;
// `;

const ButtonGroup: React.FC<ButtonGroupProps> = ({ onConfirm, onCancel }) => {
  return (
    <>
      {!onCancel ? (
        <ButtonAtom
          text="확인"
          label="확인 버튼"
          buttontype="confirm"
          onClick={onConfirm}
          type="button"
        />
      ) : (
        <>
          <ButtonAtom
            text="확인"
            label="확인 버튼"
            buttontype="On"
            onClick={onConfirm}
            type="button"
          />
          <ButtonAtom
            text="취소"
            label="취소 버튼"
            buttontype="Off"
            onClick={onCancel}
            type="button"
          />
        </>
      )}
    </>
  );
};

export default ButtonGroup;
