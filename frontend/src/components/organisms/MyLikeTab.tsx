import React from "react";
import styled from "styled-components";
import { MdOutlineArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const MenuList = styled.ul`
  padding: 20px;
`;
const MenuListItem = styled.li`
  height: 65px;
  line-height: 65px;
  border-bottom: 1px solid #ececec;
`;

const LinkA = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const MenuArr = [
  { id: 1, menu: "좋아요 누른 레시피", to: "/mypage/like_recipe" },
  { id: 2, menu: "좋아요 누른 게시물", to: "/mypage/like_posting" },
  { id: 3, menu: "내 레시피", to: "/mypage/my_recipe" },
  { id: 4, menu: "내 게시물", to: "/mypage/my_posting" },
];

export default function MyLikeTab() {
  return (
    <MenuList>
      {MenuArr.map((item) => (
        <MenuListItem key={item.id}>
          <LinkA to={item.to}>
            <MdOutlineArrowRight size={25} color={"#FE8D00"} />
            {item.menu}
          </LinkA>
        </MenuListItem>
      ))}
    </MenuList>
  );
}
