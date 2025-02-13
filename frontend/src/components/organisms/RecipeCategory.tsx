import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RecipeImgBox from "../molecules/RecipeImgBox";
import HeadingAtom from "../atoms/HeadingAtom";
import axios from "axios";
import { usePageRender } from "./PageRenderContext";
interface RecipeProps {
  id: number;
  title: string;
  img: string;
  alt?: string;
}

const Container = styled.div`
  margin-bottom: 20px;
`;
const RecipeList = styled.ul`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  gap: 25px;

  @media (min-width: 768px) {
    gap: 40px;
  }
`;

const RecipeListItem = styled.li`
  margin-right: 10px;
`;

const CategoryIntro = styled.p`
  font-size: 13px;
  color: #a9a9a9;
  margin-bottom: 20px;
`;

const LoadingFont = styled.p`
  font-weight: 700;
  font-size: 20px;
`;
export default function RecipeCategory({
  category,
  introduce,
}: {
  category: string;
  introduce?: string;
}) {
  const { recipes, setRecipes, loading, setLoading } = usePageRender();

  return (
    <Container>
      <HeadingAtom
        level={3}
        color="#121212"
        $marginBottom={introduce ? "0px" : "20px"}
      >
        {category}
      </HeadingAtom>
      {introduce && <CategoryIntro>{introduce}</CategoryIntro>}
      {loading ? (
        <RecipeList>
          <LoadingFont>Loading...</LoadingFont>
        </RecipeList>
      ) : (
        <RecipeList>
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeListItem key={recipe.id}>
                <RecipeImgBox
                  text={recipe.title}
                  recipeID={recipe.id}
                  src={recipe.img}
                />
              </RecipeListItem>
            ))
          ) : (
            <p>No data available</p>
          )}
        </RecipeList>
      )}
    </Container>
  );
}
