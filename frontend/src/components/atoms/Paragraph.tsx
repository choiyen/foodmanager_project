import React from "react";
import styled from "styled-components";
interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}
const StyleParagraph = styled.p``;
export default function Paragraph({ children, className }: ParagraphProps) {
  return <StyleParagraph className={className}>{children}</StyleParagraph>;
}
