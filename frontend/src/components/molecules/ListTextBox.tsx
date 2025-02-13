import React from "react";
import styled from "styled-components";
import HeadingAtom from "../atoms/HeadingAtom";
import TextboxAtom from "../atoms/TextboxAtom";
import IconButtonAtom from "../atoms/IconButtonAtom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Span = styled.span`
  display: inline-block;
  margin-right: 5px;
`;
const LiElement = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Ul = styled.ul`
  margin-bottom: 10px;
`;

const AddListButton = styled(IconButtonAtom)`
  align-self: center;
`;
interface ListTextBoxProps {
  text: string;
}

export default function ListTextBox({ text }: ListTextBoxProps) {
  return (
    <Container>
      <HeadingAtom level={3} color="#121212">
        {text}
      </HeadingAtom>
      <Ul>
        <LiElement>
          <Span>1.</Span>
          <TextboxAtom width="65vw" margin="0 20px" />
          <IconButtonAtom
            label="삭제버튼"
            BGcolor="orange"
            variant="solid"
            icontype="trash"
          />
        </LiElement>
      </Ul>
      <AddListButton
        label="추가버튼"
        variant="ghost"
        BGcolor="none"
        icontype="plus"
      />
    </Container>
  );
}
