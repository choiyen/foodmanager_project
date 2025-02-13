import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LogoImg from "../atoms/LogoImg";
import { CiLogin } from "react-icons/ci";
import IconButtonAtom from "../atoms/IconButtonAtom";
import { Link } from "react-router-dom";
import axios from "axios";
import Notification from "./Notification";
// import { withCookies, ReactCookieProps, useCookies } from "react-cookie";

const Container = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  height: 55px;
  background-color: #ffffff;
  gap: 10px;
  padding-right: 20px;

  @media (min-width: 768px) {
    gap: 20px;
    height: 80px;
  }
`;

const LoginButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  svg {
    font-size: 24px;
  }
  &:hover {
    background-color: #e0e0e0; /* Hover 효과 */
  }
`;

export default function Header({ hide = false }: { hide?: boolean }) {
  // const [cookies, setCookie, removeCookie] = useCookies(["connect.sid"]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const route = process.env.REACT_APP_ROUTE;
  const fetchItems = async () => {
    try {
      const usering = await axios({
        method: "GET",
        url: `${route}/user/check`,
        withCredentials: true,
      });
      setIsLogin(usering.data.result);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);
  // interface Props extends ReactCookieProps {}
  const Logout = async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${process.env.REACT_APP_ROUTE}/user/logout`,
        withCredentials: true,
      });
      // domain 옵션을 제거하고 path만 설정
      // removeCookie("connect.sid", { path: "/" });
      document.cookie =
        "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    } catch (error) {
      console.error("Error Logout: ", error);
    }
  };
  return (
    <>
      <Notification
        title="로그아웃"
        message="로그아웃 하시겠습니까?"
        alertDisplay={isDisplay}
        type="warning"
        onConfirm={async () => {
          await Logout(); // 로그아웃 api 요청
          await setIsLogin(false); // 아이콘 다시 로그인버튼으로
          await setIsDisplay(false); // 알림창 제거
        }}
        onCancel={() => {
          setIsDisplay(false); // 알림창만 제거
        }}
      />
      <Container>
        <LogoImg large={false} />
        {!hide && (
          <>
            {isLogin ? (
              <IconButtonAtom
                label="로그아웃 버튼"
                icontype="people"
                onClick={() => {
                  setIsDisplay(true); // 알림창 띄우기
                }}
                size="30px"
              />
            ) : (
              <LoginButton to="/login">
                <CiLogin size="35px" />
              </LoginButton>
            )}
          </>
        )}
      </Container>
    </>
  );
}
