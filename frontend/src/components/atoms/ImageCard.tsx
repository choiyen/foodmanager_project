import React from "react";
import styled from "styled-components";

const Img = styled.img``;
interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageCard({ src, alt, className }: ImageCardProps) {
  return <Img src={src} alt={alt} className={className} />;
}
