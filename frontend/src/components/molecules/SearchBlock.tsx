import React from "react";
import styled from "styled-components";
import InputForm from "../atoms/InputForm";
import IconButtonAtom from "../atoms/IconButtonAtom";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default function SearchBlock() {
  return (
    <Container>
      <InputForm
        placeholder="검색어를 입력해주세요"
        $isLarge={true}
        marginRight="10px"
      />
      <IconButtonAtom
        label="검색버튼"
        BGcolor="transparent"
        variant="outline"
        icontype="search"
        color="orange"
      />
    </Container>
  );
}
