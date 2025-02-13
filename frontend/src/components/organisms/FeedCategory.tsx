import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainCard from "../molecules/MainCard";
import HeadingAtom from "../atoms/HeadingAtom";
import axios from "axios";
import { usePageRender } from "./PageRenderContext";

interface FeedData {
  recipeID: number;
  title: string;
  rating: number;
  img: string;
}

const FeedList = styled.ul`
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: row;
    width: 850px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
type Recipe = {
  recipeID: number;
  title: string;
  img: string;
};

type Review = {
  id: number;
  userID: string;
  recipeID: number;
  rating: number;
};

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeadingStyle = styled(HeadingAtom)`
  align-self: flex-start;
  margin-bottom: 20px;
`;

const route = process.env.REACT_APP_ROUTE;

const calculateReview = (recipes: Recipe[], reviews: Review[]): FeedData[] => {
  const ratingMap: Record<number, { total: number; count: number }> = {};

  // 리뷰 데이터를 기반으로 recipeID별 총합과 개수 계산
  reviews.map((review) => {
    const { recipeID, rating } = review;
    if (!ratingMap[recipeID]) {
      ratingMap[recipeID] = { total: 0, count: 0 };
    }
    ratingMap[recipeID].total += rating;
    ratingMap[recipeID].count += 1;
  });

  // 레시피 데이터를 가공하여 결과 생성
  return recipes.map((recipe) => {
    const { recipeID, title, img } = recipe;
    const ratingData = ratingMap[recipeID] || { total: 0, count: 0 };
    const averageRating =
      ratingData.count > 0
        ? parseFloat((ratingData.total / ratingData.count).toFixed(1))
        : 0;

    return { recipeID, title, img, rating: averageRating };
  });
};

const processRecipeData = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${route}/Recipe`,
      withCredentials: true,
    });

    // 서버에서 받은 데이터 구조 분해
    const { recipes, reviews } = res.data.data;
    // 데이터를 가공
    const processedData = calculateReview(recipes, reviews);

    return processedData; // 배열 반환
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export default function FeedCategory() {
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [Loading, setLoading] = useState(false);

  // 컨텍스트 사용
  const { mainPageRender, setMainPageRender } = usePageRender();
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const result = await processRecipeData();
      if (result !== undefined) {
        setFeeds(result);
      }
      setLoading(false);
    };

    fetchItems();
  }, [mainPageRender]);
  return (
    <ContentWrap>
      <HeadingStyle level={3} color="#121212" $marginBottom="10px">
        레시피
      </HeadingStyle>
      {Loading ? (
        <p>Loading...</p>
      ) : (
        <FeedList>
          {feeds.map((feed) => (
            <MainCard
              img={feed.img}
              key={feed.recipeID}
              recipeID={feed.recipeID}
              title={feed.title}
              rating={feed.rating}
            />
          ))}
        </FeedList>
      )}
    </ContentWrap>
  );
}
