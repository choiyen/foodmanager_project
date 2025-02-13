import React from "react";
import styled from "styled-components";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsFire } from "react-icons/bs";

interface ReactCircularProgressbarProps {
  GraphValue: number;
  GraphMaxValue: number;
}

const Container = styled.div`
  width: 250px;
  height: 250px;
  margin-top: 20px;
`;

const TextBox = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #9c9c9c;
  text-align: center;
`;

const ImpactText = styled.strong`
  color: #121212;
  font-size: 40px;
`;

export default function ReactCircularProgressbar({
  GraphValue,
  GraphMaxValue,
}: ReactCircularProgressbarProps) {
  return (
    <Container>
      {GraphValue > GraphMaxValue ? (
        <CircularProgressbarWithChildren
          value={GraphValue}
          maxValue={GraphMaxValue}
          styles={buildStyles({
            rotation: 1,
            strokeLinecap: "round",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `#ea4a4a`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#FE8D00",
          })}
        >
          <BsFire size={30} color="#FE8D00" />
          <TextBox>
            {GraphMaxValue} / <ImpactText>{GraphValue}</ImpactText>
            <br />
            권장 칼로리를 초과했어요!
          </TextBox>
        </CircularProgressbarWithChildren>
      ) : (
        <CircularProgressbarWithChildren
          value={GraphValue}
          maxValue={GraphMaxValue}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 1,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "round",

            // Text size
            textSize: "16px",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `rgba(254, 141, 0, 1)`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#FE8D00",
          })}
        >
          <BsFire size={30} color="#FE8D00" />
          <TextBox>
            {GraphMaxValue} / <ImpactText>{GraphValue}</ImpactText>
            <br />
            칼로리를 먹었어요!
          </TextBox>
        </CircularProgressbarWithChildren>
      )}
    </Container>
  );
}
