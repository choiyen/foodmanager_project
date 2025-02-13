import React from "react";

interface LabelProps {
  htmlFor: string;
  text: string;
}

export default function Label({ htmlFor, text }: LabelProps) {
  return <label htmlFor={htmlFor}>{text}</label>;
}
