import { IconButton } from "@chakra-ui/react";
import styled from "styled-components";
import {
  BsTrash3,
  BsPlusCircle,
  BsBell,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import {
  IoHomeOutline,
  IoPeople,
  IoPersonCircleOutline,
} from "react-icons/io5";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaArrowCircleUp,
  FaTimesCircle,
  FaHeart,
  FaExclamationTriangle,
  FaQuestionCircle,
} from "react-icons/fa";
import { GiAlarmClock } from "react-icons/gi";
import { TbArrowBigUpLine } from "react-icons/tb";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { BsBox2Heart } from "react-icons/bs";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import { BsPatchCheckFill } from "react-icons/bs";
import { PiNotePencilFill } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";

interface IconButtonAtomProps {
  label: string;
  BGcolor?: string;
  variant?: "solid" | "subtle" | "surface" | "outline" | "ghost" | "plain";
  color?: string;
  icontype:
    | "trash"
    | "plus"
    | "bell"
    | "search"
    | "home"
    | "leftArrow"
    | "rightArrow"
    | "upArrow"
    | "ex"
    | "heart"
    | "clock"
    | "people"
    | "BigUpArrow"
    | "chart"
    | "heartbox"
    | "profile"
    | "hiArrow"
    | "Exclamation"
    | "question"
    | "checkMark"
    | "Notepen"
    | "ex";
  size?: string;
  onClick?: () => void;
  position?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  className?: string;
}

const IconButtons = styled(IconButton)<{
  BGcolor?: string;
  color?: string;
  size?: string;
  position?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}>`
  background-color: ${({ BGcolor }) =>
    BGcolor === "orange" ? "#fe8d00" : "transparent"};
  border-radius: 10px;
  align-self: center;
  color: ${({ color }) => (color === "orange" ? "#fe8d00" : "black")};
  svg {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
  position: ${({ position }) => position}; // position 스타일을 적용
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  z-index: 10;
`;

export default function IconButtonAtom({
  label,
  BGcolor,
  variant = "ghost",
  icontype,
  color,
  size,
  onClick,
  position,
  top,
  left,
  right,
  bottom,
  className,
}: IconButtonAtomProps) {
  const renderIcon = () => {
    switch (icontype) {
      case "trash":
        return <BsTrash3 />;
      case "plus":
        return <BsPlusCircle />;
      case "bell":
        return <BsBell />;
      case "search":
        return <BsArrowRightCircleFill />;
      case "home":
        return <IoHomeOutline />;
      case "leftArrow":
        return <FaArrowCircleLeft />;
      case "rightArrow":
        return <FaArrowCircleRight />;
      case "upArrow":
        return <FaArrowCircleUp />;
      case "ex":
        return <FaTimesCircle />;
      case "heart":
        return <FaHeart />;
      case "clock":
        return <GiAlarmClock />;
      case "people":
        return <IoPeople />;
      case "BigUpArrow":
        return <TbArrowBigUpLine />;
      case "chart":
        return <HiOutlineChartSquareBar />;
      case "heartbox":
        return <BsBox2Heart />;
      case "profile":
        return <IoPersonCircleOutline />;
      case "hiArrow":
        return <HiArrowRightEndOnRectangle />;
      case "Exclamation":
        return <FaExclamationTriangle />;
      case "question":
        return <FaQuestionCircle />;
      case "checkMark":
        return <BsPatchCheckFill />;
      case "Notepen":
        return <PiNotePencilFill />;
      default:
        return null;
    }
  };

  return (
    <IconButtons
      aria-label={label}
      variant={variant}
      BGcolor={BGcolor}
      color={color}
      size={size}
      onClick={onClick}
      position={position}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      className={className}
    >
      {renderIcon()}
    </IconButtons>
  );
}
