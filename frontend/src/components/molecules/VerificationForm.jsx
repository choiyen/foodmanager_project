import React, { useState } from "react";
import InputField from "./InputField";
import ButtonAtom from "../atoms/ButtonAtom";
import Timer from "../atoms/Timer";

const VerificationForm = ({ onSubmit, initialTime }) => {
  const [code, setCode] = useState("");
  const [isTimeUp, setIsTimeUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isTimeUp) {
      onSubmit(code);
    }
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="인증번호"
        type="text"
        id="verificationCode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="인증번호를 입력하세요"
      />
      <ButtonAtom type="submit" disabled={isTimeUp}>
        확인
      </ButtonAtom>
      <div>
        남은 시간: <Timer initialTime={initialTime} onTimeUp={handleTimeUp} />
      </div>
    </form>
  );
};

export default VerificationForm;
