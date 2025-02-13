import React from "react";

interface ValidationMessageProps {
  message: string;
}

export default function ValidationMessage({ message }: ValidationMessageProps) {
  return <div>{message}</div>;
}
