import React, { useState } from "react";
import styled from "styled-components";
import ReactDataPicker from "../atoms/ReactDataPicker";
import ReactCircularProgressbar from "../atoms/ReactCircularProgressbar";
import { usePageRender } from "../organisms/PageRenderContext"; // 작성한 PageRenderContext 파일

const Container = styled.div`
  height: 45vh;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 50vw;
    margin: 0 auto;
  }
`;

const CalenderWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Wrapgraph({
  NeedKcal = 2700,
  Totalkcal,
}: {
  NeedKcal: number;
  Totalkcal: number;
}) {
  // const [startDate, setStartDate] = useState<Date | null>(new Date());
  const { startDate, setStartDate } = usePageRender();
  return (
    <Container>
      <CalenderWrap>
        <ReactDataPicker startDate={startDate} setStartDate={setStartDate} />
      </CalenderWrap>
      <ReactCircularProgressbar
        GraphValue={Totalkcal}
        GraphMaxValue={NeedKcal}
      />
    </Container>
  );
}
