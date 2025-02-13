import React, { useState } from "react";
import InputField from "../molecules/InputField";
import ButtonAtom from "../atoms/ButtonAtom";
import Timer from "../atoms/Timer";
import { useContext } from "react";
import { PasswordResetContext } from "../pages/PasswordResetPage";
import TextInputForm from "../atoms/TextInputForm";
import { Navigate } from "react-router-dom";
import axios from "axios";
interface VerificationCodeFormProps {
  initialTime: number;
}

const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
  initialTime,
}) => {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const passwordcontext = useContext(PasswordResetContext);

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode && isNaN(Number(verificationCode)) == false) {
      const verification = await axios({
        method: "POST",
        url: "/user/Certifications",
        withCredentials: true,
        data: {
          userID: passwordcontext?.email,
          count: verificationCode,
        },
      });
      if (verification.data.result == true) {
        alert("올바른 인증번호입니다.");
        passwordcontext?.setStep(3);
      } else {
        alert("올바른 인증번호를 입력해주세요");
        setVerificationCode("");
      }
    } else {
      alert("숫자만 입력 가능합니다.");
      setVerificationCode("");
    }
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
  };

  return (
    <form onSubmit={handleCodeSubmit}>
      <TextInputForm
        placeholder="인증번호를 입력하세요"
        label="인증번호"
        value={verificationCode}
        setValue={setVerificationCode}
      />
      <ButtonAtom
        text="확인"
        buttontype="confirm"
        type="submit"
        disabled={isTimeUp}
      />
      <div>
        남은 시간: <Timer initialTime={initialTime} onTimeUp={handleTimeUp} />
      </div>
    </form>
  );
};

export default VerificationCodeForm;
