import React from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";

const Container = styled.div`
  margin-top: 30px;
  text-align: center;
  padding: 0 20px;

  font-size: 18px;
  font-weight: 700;
`;

interface NotificationBodyProps {
  children: string | Element;
}

const NotificationBody: React.FC<NotificationBodyProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default NotificationBody;
