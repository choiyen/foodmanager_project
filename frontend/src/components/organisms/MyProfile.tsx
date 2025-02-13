import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeadingAtom from "../atoms/HeadingAtom";
import UserInfo from "../molecules/UserInfo";
import IconButtonAtom from "../atoms/IconButtonAtom";
import axios from "axios";

const Container = styled.div`
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 20px 20px;
  padding: 20px;
  background-color: #ffffff;
  position: relative;
`;

export default function MyProfile() {
  const [userInfo, setUserInfo] = useState({
    birthday: "",
    gender: "",
    kcalPerDay: "",
    name: "",
    pw: "",
    userID: "",
  });
  const api = process.env.REACT_APP_ROUTE;
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${api}/user/getUser`, {
          withCredentials: true,
        });
        // setItems(response.data); // {name: "jonghyun"}
        setUserInfo(response.data.result);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };
    fetchItems();
  }, []);
  return (
    <Container>
      <HeadingAtom level={2}>내 프로필</HeadingAtom>
      <UserInfo
        name={userInfo.userID || "로그인 해주세요"}
        birthday={userInfo.birthday || " - "}
        gender={
          userInfo.gender === "male"
            ? "남성"
            : userInfo.gender === "female"
            ? "여성"
            : " - "
        }
      />
      {/* {userInfo.userID && <IconButtonAtom
        label="프로필 수정 버튼"
        icontype="Notepen"
        variant="ghost"
        BGcolor="transparent"
        color="#121212"
        size="25px"
        position="absolute"
        top="10px"
        right="20px"
      />} */}
    </Container>
  );
}
