import React from "react";
import styled from "styled-components";
import ImageCard from "../atoms/ImageCard";

const ImageWrap = styled.div`
  height: 400px;
  overflow: hidden;
  position: relative;
  border-radius: 20px 20px 0px 0px;
`;

const ImageStyle = styled(ImageCard)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition-duration: 200ms;
  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

export default function ViewImage({ value }: { value: string }) {
  return (
    <ImageWrap>
      {value.includes("http") ? 
    <ImageStyle src={value} alt="피드 이미지" />
    : <ImageStyle src={"../../" + value} alt="피드 이미지" />   
    }
      
      
    </ImageWrap>
  );
}
