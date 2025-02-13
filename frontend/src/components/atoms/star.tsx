import React from "react";
import { HiStar } from "react-icons/hi";

export default function Star({
  size,
  color,
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return <HiStar size={size} color={color} className={className} />;
}
