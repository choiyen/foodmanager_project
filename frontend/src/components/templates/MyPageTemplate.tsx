import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyProfile from "../organisms/MyProfile";
import MyLikeTab from "../organisms/MyLikeTab";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  @media (min-width: 768px) {
    width: 50vw;
    margin: 0 auto;
  }
`;

export default function MyPageTemplate() {
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
  });

  return (
    <Container>
      <MyProfile />
      {isLogin && <MyLikeTab />}
    </Container>
  );
}
