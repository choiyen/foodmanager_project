import React from "react";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";

const LoginButton = styled(Button)`
  background-color: #fe8d00;
  font-weight: bold;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-size: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const LongButton = styled(Button)`
  background-color: #fe8d00;
  font-weight: bold;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
`;

const UploadButton = styled(LongButton)`
  position: fixed;
  z-index: 50;
`;

const ConfirmButton = styled(Button)`
  background-color: #fe8d00;
  font-weight: bold;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const OnButton = styled(ConfirmButton)`
  left: 70%;
`;
const OffButton = styled(ConfirmButton)`
  left: 30%;
  border: 2px solid #fe8d00;
  background-color: #ffffff;
  color: #676767;
`;
interface ButtonAtomProps {
  text: string;
  buttontype: string;
  type: "button" | "reset" | "submit" | undefined;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ButtonAtom({
  text,
  buttontype,
  onClick,
  type = "button",
  disabled = false,
  className,
}: ButtonAtomProps) {
  const renderButton = () => {
    switch (buttontype) {
      case "login":
        return (
          <LoginButton type={type} disabled={disabled}>
            {text}
          </LoginButton>
        );
      case "signUp":
        return (
          <LongButton type={type} disabled={disabled}>
            {text}
          </LongButton>
        );
      case "upload":
        return (
          <UploadButton type={type} onClick={onClick}>
            {text}
          </UploadButton>
        );
      case "confirm":
        return (
          <ConfirmButton type={type} onClick={onClick} className={className}>
            {text}
          </ConfirmButton>
        );
      case "On":
        return (
          <OnButton type={type} onClick={onClick}>
            {text}
          </OnButton>
        );
      case "Off":
        return (
          <OffButton type={type} onClick={onClick}>
            {text}
          </OffButton>
        );
      default:
        return null;
    }
  };
  return <>{renderButton()}</>;
}
