import React from "react";
import styled from "styled-components";

interface HeadingProps {
  level: 1 | 2 | 3 | 4; // h1 ~ h4
  children: React.ReactNode;
  color?: string; // 필요 시 추가 속성
  $marginBottom?: string; // 필요 시 추가 속성
  className?: string;
}

const StyledHeading = styled.div<{
  level: number;
  color?: string;
  $marginBottom?: string;
}>`
  font-size: ${({ level }) => {
    switch (level) {
      case 1:
        return "2rem"; // h1 크기
      case 2:
        return "1.5rem"; // h2 크기
      case 3:
        return "1.25rem"; // h3 크기
      case 4:
        return "1rem"; // h4 크기
      default:
        return "1rem";
    }
  }};
  font-weight: bold;
  color: ${({ color }) => color || "inherit"};
  margin-bottom: ${({ $marginBottom }) => $marginBottom || "0"};
`;

export default function HeadingAtom({
  level,
  children,
  color,
  $marginBottom,
  className,
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements; // 동적으로 태그 설정

  return (
    <StyledHeading
      as={Tag}
      level={level}
      color={color}
      $marginBottom={$marginBottom}
      className={className}
    >
      {children}
    </StyledHeading>
  );
}
