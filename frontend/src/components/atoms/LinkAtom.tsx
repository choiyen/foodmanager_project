import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";

import { BsBox2Heart } from "react-icons/bs";
import { BsClipboardData } from "react-icons/bs";
import { BsHouseDoor } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";

interface LinkAtomProps {
  url: string;
  label: string;
  status: "House" | "Data" | "Box" | "Profile";
  className?: string;
}

const LinkStyle = styled(Link)`
  @media (min-width: 768px) {
    display: block;
    width: 100%;
  }
`;
const ButtonStyle = styled(IconButton)`
  @media (min-width: 768px) {
    justify-content: left;
    width: 100%;
  }
`;
const Span = styled.span`
  display: none;
  @media (min-width: 768px) {
    display: inline;
    font-size: 18px;
  }
`;
export default function LinkAtom({
  url,
  label,
  status,
  className,
}: LinkAtomProps) {
  return (
    <LinkStyle to={url} className={className}>
      <ButtonStyle
        aria-label={label}
        variant="ghost"
        size="lg"
        colorPalette={"orange"}
        color={"black"}
        fontSize="50px" // 아이콘 크기 키우기
      >
        {(() => {
          switch (status) {
            case "House":
              return <BsHouseDoor style={{ width: "30px", height: "30px" }} />;
            case "Data":
              return (
                <BsClipboardData style={{ width: "30px", height: "30px" }} />
              );
            case "Box":
              return <BsBox2Heart style={{ width: "30px", height: "30px" }} />;
            case "Profile":
              return (
                <BsPersonCircle style={{ width: "30px", height: "30px" }} />
              );
          }
        })()}
        <Span>{label}</Span>
      </ButtonStyle>
    </LinkStyle>
  );
}
