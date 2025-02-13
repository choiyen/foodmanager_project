import React, { useState } from "react";
import styled from "styled-components";
import EmailInputForm from "../organisms/EmailInputForm";
import VerificationCodeForm from "../organisms/VerificationCodeForm";
import PasswordResetForm from "../organisms/PasswordResetForm";
import { createContext } from "node:vm";
import LinkAtom from "../atoms/LinkAtom";

const Container = styled.div`
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;

const StepWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const StyledEmailInputForm = styled(EmailInputForm)`
  width: 100%;
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  label {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
    display: block;
  }
`;

const StyledVerificationCodeForm = styled(VerificationCodeForm)`
  display: flex;
  flex-direction: column;
  gap: 15px;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const StyledPasswordResetForm = styled(PasswordResetForm)`
  display: flex;
  flex-direction: column;
  gap: 15px;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const HomeButton = styled(LinkAtom)`
  position: absolute;
  top: 20px;
  right: 20px;

  @media (min-width: 768px) {
    display: inline-block;
    max-width: 70px;
  }
`;
type PasswordResetType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  birthday: string;
  setbirthday: React.Dispatch<React.SetStateAction<string>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const PasswordResetContext = React.createContext<
  PasswordResetType | undefined
>(undefined);

const PasswordResetPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState<string>("");
  const [birthday, setbirthday] = useState<string>("");

  return (
    <PasswordResetContext.Provider
      value={{ email, setEmail, birthday, setbirthday, step, setStep }}
    >
      <Container>
        <StepWrapper>
          <Title>비밀번호 재설정</Title>
          {step === 1 && <StyledEmailInputForm />}
          {step === 2 && <StyledVerificationCodeForm initialTime={180} />}
          {step === 3 && <StyledPasswordResetForm />}
        </StepWrapper>
        <HomeButton url="/main" label="홈" status="House" />
      </Container>
    </PasswordResetContext.Provider>
  );
};

export default PasswordResetPage;
