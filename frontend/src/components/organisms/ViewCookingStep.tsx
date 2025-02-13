import React from "react";
import styled from "styled-components";
import HeadingAtom from "../atoms/HeadingAtom";

interface StepProps {
  stepNo: string;
  content: string;
}

const Container = styled.div`
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;
const CookingList = styled.ul``;

const CookingItem = styled.li`
  display: flex;
  align-items: center;
  line-height: 1.5;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

const Span = styled.span`
  font-weight: 600;
  font-size: 17px;
`;

export default function ViewCookingStep({ value }: { value: StepProps[] }) {

  return (
    <Container>
      <HeadingAtom level={3} $marginBottom="10px">
        조리 순서
      </HeadingAtom>

      <CookingList>
        {value.map((item) => (
          <CookingItem key={item.stepNo}>
            <Span>{item.stepNo}.</Span>
            {item.content}
          </CookingItem>
        ))}
      </CookingList>
    </Container>
  );
}
