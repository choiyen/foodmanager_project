import React, { useEffect } from "react";
import styled from "styled-components";
import NotificationHeader from "../molecules/NotificationHeader";
import NotificationBody from "../molecules/NotificationBody";
import ButtonGroup from "../molecules/ButtonGroup";

const NotificationContainer = styled.div<{ $display: boolean }>`
  z-index: 200;
  width: 300px;
  min-height: 250px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ $display }) => ($display ? "block" : "none")};
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  padding: 0 20px;

  font-size: 15px;
  font-weight: 500;
  color: #6e6e6e;
`;

interface NotificationProps {
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  onConfirm: () => void;
  onCancel?: () => void;
  alertDisplay?: boolean;
}

const Notification: React.FC<NotificationProps> = ({
  title,
  message,
  type,
  onConfirm,
  onCancel,
  alertDisplay = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (alertDisplay && event.key === "Enter") {
        onConfirm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [alertDisplay, onConfirm]);

  return (
    <NotificationContainer $display={alertDisplay}>
      {/* Header */}
      <NotificationHeader
        title={title}
        type={type}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />

      {/* Body */}
      <Container>{message}</Container>

      {/* Buttons */}
      <ButtonGroup onConfirm={onConfirm} onCancel={onCancel} />
    </NotificationContainer>
  );
};

export default Notification;
