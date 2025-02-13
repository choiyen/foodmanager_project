import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../organisms/Header";
import RecipeCategory from "../organisms/RecipeCategory";
import NavBar from "../organisms/NavBar";
import FoodHistory from "../organisms/FoodHistory";
import axios from "axios";
import { usePageRender } from "../organisms/PageRenderContext";
import { useNavigate } from "react-router-dom";

interface GroceryItem {
  amount: number; // 수량
  category: number; // 카테고리 (id 또는 index로 보임)
  expiration: string; // 유통기한 (ISO8601 형식의 문자열)
  groceryID: number; // 식료품 고유 ID
  groceryname: string; // 식료품 이름
  unit: string; // 단위 (예: 마리, 개 등)
  userID: string; // 사용자 ID
}

const Container = styled.div`
  padding: 20px;

  @media (min-width: 768px) {
    width: 50vw;
    margin: 0 auto;
  }
`;

const Loading = styled.div`
  width: 100vw;
  padding: 30px;
  text-align: center;
`;

export default function Myfood() {
  const { groceryPageRender, setGroceryPageRender } = usePageRender();
  const [groceryData, setGroceryData] = useState<GroceryItem[]>([]);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const route = process.env.REACT_APP_ROUTE;
  useEffect(() => {
    axios({
      method: "GET",
      url: `${route}/user/check`,
      withCredentials: true,
    }).then((res) => {
      setIsLogin(res.data.result);
    });

    const data = axios({
      method: "GET",
      url: `${route}/grocery`,
      withCredentials: true,
    }).then((res) => {
      const Data = SortData(res.data);
      setGroceryData(Data);
    });
  }, [groceryPageRender]);

  const SortData = (data: GroceryItem[]): GroceryItem[] => {
    const Data = data.sort(
      (a, b) =>
        new Date(a.expiration).getTime() - new Date(b.expiration).getTime()
    );
    return Data;
  };

  if (!isLogin) {
    navigate("/login");
  }

  return (
    isLogin && (
      <div>
        <Header />
        <Container>
          <RecipeCategory
            category="오늘 뭐먹지?"
            introduce="냉장고 속의 재료들로 만들수 있어요!"
          />
          <FoodHistory
            category="냉장고 속 재료"
            type="ingredient"
            groceryData={groceryData}
          />
        </Container>
        <NavBar />
      </div>
    )
  );
}
