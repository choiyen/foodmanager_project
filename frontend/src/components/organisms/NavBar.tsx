import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LinkAtom from "../atoms/LinkAtom";
import { BsPlusCircle } from "react-icons/bs";
import InputModal from "./InputModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  z-index: 999;

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    left: 0;
    top: 0;
    bottom: 0;
    width: 150px;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
    height: 100%;
    padding-left: 20px;
    padding-top: 40px;

    gap: 30px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  width: 35px;
  height: 35px;

  @media (min-width: 768px) {
    position: fixed;
    right: 50px;
    bottom: 100px;
    color: #fe8d00;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
  }
`;

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(1); // input 탭전환

  const route = process.env.REACT_APP_ROUTE;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${route}/user/check`,
      withCredentials: true,
    }).then((res) => {
      setIsLogin(res.data.result);
      setIsModalOpen(false);
    });
  }, []);

  const openModal = () => {
    if (isLogin) {
      setIsModalOpen(true);
    } else {
      navigate("/login");
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelected(2);
    setTimeout(() => {
      setSelected(1);
    }, 50);
  };

  return (
    <>
      <Container>
        <InputModal
          $isOpen={isModalOpen}
          onClose={closeModal}
          selected={selected}
          setSelected={setSelected}
        />
        <LinkAtom url="/main" label="홈" status="House" />
        <LinkAtom url="/nutrition" label="식단분석" status="Data" />
        <Button onClick={openModal}>
          <BsPlusCircle size="100%" />
        </Button>
        <LinkAtom url="/myfood" label="재료 관리" status="Box" />
        <LinkAtom url="/mypage" label="내 정보" status="Profile" />
      </Container>
    </>
  );
}
