import React from "react";
import styled from "styled-components";
import { FaUserGroup } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { PiArrowFatLineUpFill } from "react-icons/pi";

const IconWrap = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #d6d6d6;
  box-sizing: border-box;
  padding: 10px;
`;
const Icon = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  flex-basis: 1;
`;
export default function ViewIconWrap({
  time,
  mealCount,
  level,
}: {
  time: string;
  mealCount: string;
  level: string;
}) {
  return (
    <IconWrap>
      <Icon>
        <FaClock size={30} color={"#121212"} />
        {time}
      </Icon>
      <Icon>
        <FaUserGroup size={30} color={"#121212"} />
        {mealCount}
      </Icon>
      <Icon>
        <PiArrowFatLineUpFill size={30} color={"#121212"} />
        {level}
      </Icon>
    </IconWrap>
  );
}
