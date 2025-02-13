import React from "react";
import styled from "styled-components";
import ImageCard from "../atoms/ImageCard";
import HeadingAtom from "../atoms/HeadingAtom";
import { Link } from "react-router-dom";

interface RecipeImgBoxProps {
  recipeID: number;
  text?: string;
  src?: string;
  alt?: string;
}

const Container = styled.div`
  display: inline-block;
  text-align: center;
`;

const StyledImageCard = styled(ImageCard)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ImgWrap = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 15px;

  width: 100px;
  height: 100px;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const StyledHeading = styled(HeadingAtom)`
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100px;
  font-size: 14px;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 16px;
    width: 120px;
  }
`;
export default function RecipeImgBox({
  text = "요리제목",
  src = "https://picsum.photos/100",
  alt = "레시피 이미지",
  recipeID,
}: RecipeImgBoxProps) {
  return (
    <Link to={"/main/view/" + recipeID + "?type=defaultRecipe"}>
      <Container>
        <ImgWrap>
          <StyledImageCard src={src} alt={alt} />
        </ImgWrap>
        <StyledHeading level={4} color="#121212" $marginBottom="">
          {text}
        </StyledHeading>
      </Container>
    </Link>
  );
}
