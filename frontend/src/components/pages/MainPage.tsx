import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SwitchTab from "../molecules/SwitchTab";
import RecipeTemplate from "../templates/RecipeTemplate";
import Header from "../organisms/Header";
import NavBar from "../organisms/NavBar";
import FeedTemplate from "../templates/FeedTemplate";
interface Item {
  name: string;
}
const Container = styled.div`
  position: relative;
`;

export default function MainPage() {
  const [items, setItems] = useState<Item>();
  const [selected, setSelected] = useState(1); // 탭전환
  return (
    <Container>
      <Header />
      <SwitchTab
        menu1="레시피"
        menu2="게시글"
        selected={selected}
        setSelected={setSelected}
      />
      {selected === 1 ? <RecipeTemplate /> : <FeedTemplate />}

      <NavBar />
    </Container>
  );
}
