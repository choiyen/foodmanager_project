import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import IconButtonAtom from "./IconButtonAtom";

const StyledButton = styled(IconButtonAtom)`
  left: 10px;
  align-self: flex-start;
  @media (min-width: 768px) {
    left: 170px;
  }
`;

export default function BackButton({
  position = "relative",
  className,
}: {
  position?: string;
  className?: string;
}) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 브라우저 히스토리에서 뒤로가기
  };
  return (
    <StyledButton
      label="뒤로 가기 버튼"
      onClick={goBack}
      icontype="leftArrow"
      BGcolor="transparent"
      variant="ghost"
      color="#FE8D00"
      size="30px"
      position={position}
      className={className}
    />
  );
}
