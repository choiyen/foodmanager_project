import React from "react";
import styled from "styled-components";
import Profileimg from "../atoms/Profileimg";
import HeadingAtom from "../atoms/HeadingAtom";
interface UserInfoProps {
  name: string;
  birthday: string;
  gender: string;
}

const Container = styled.div`
  text-align: center;
`;

const ProfileImgStyle = styled(Profileimg)`
  width: 100px;
  height: 100px;
`;

const MyInfoBox = styled.p`
  font-size: 16px;
  color: #acacac;
`;

const Gender = styled.span`
  font-size: 15px;
  color: #121212;
  font-weight: 600;
`;

export default function UserInfo({ name, birthday, gender }: UserInfoProps) {
  return (
    <Container>
      <ProfileImgStyle size="2xl" />
      <HeadingAtom level={3}>{name}</HeadingAtom>
      <MyInfoBox>
        {birthday}
        <br />
        <Gender>{gender}</Gender>
      </MyInfoBox>
    </Container>
  );
}
