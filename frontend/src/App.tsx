import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/fonts.css";
import MainPage from "./components/pages/MainPage";
import { Provider as ChakraProvider } from "./components/ui/provider";
import Loading from "./components/pages/Loading";
import Login from "./components/pages/Login";
import Nutrition from "./components/pages/Nutrition";
import Myfood from "./components/pages/Myfood";
import MyPage from "./components/pages/MyPage";
import SignUp from "./components/pages/SignUp";
import FilterPosts from "./components/pages/FilterPosts";
import View from "./components/pages/View";
import { usePageRender } from "./components/organisms/PageRenderContext"; // 작성한 PageRenderContext 파일
import PasswordResetPage from "./components/pages/PasswordResetPage";
import axios from "axios";
interface RecipeProps {
  id: number;
  title: string;
  img: string;
  alt?: string;
}

function App() {
  const { recipes, setRecipes, loading, setLoading } = usePageRender();

  const api = process.env.REACT_APP_ROUTE;
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/api/items`, {
          withCredentials: true,
        });
        setRecipes(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchItems();
  }, []);
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/myfood" element={<Myfood />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/:filter" element={<FilterPosts />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/findpw" element={<PasswordResetPage />} />
          <Route path="/main/view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
