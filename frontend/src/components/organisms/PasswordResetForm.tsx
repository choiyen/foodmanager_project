import React, { useState } from "react";
import InputField from "../molecules/InputField";
import ButtonAtom from "../atoms/ButtonAtom";
import TextInputForm from "../atoms/TextInputForm";
import { useContext } from "react";
import { PasswordResetContext } from "../pages/PasswordResetPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PasswordResetForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const passwordcontext = useContext(PasswordResetContext);
  const nativegate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const newpw = await axios({
        method: "POST",
        url: "/user/pwchange",
        data: {
          userID: passwordcontext?.email,
          pw: newPassword,
        },
      });
      console.log(newpw.data);
      if (newpw.data.result == true) {
        alert("비밀번호가 변경되었습니다. 메인 화면으로 돌아갑니다!!ㄴ");
        nativegate("/main");
      } else {
        alert("비밀번호가 변경에 실패하였습니다. 메인 화면으로 돌아갑니다!!ㄴ");
        passwordcontext?.setStep(1);
      }
    } else {
      setError("비밀번호가 일치하지 않습니다.");
      //passwordcontext?.setStep(1);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInputForm
        placeholder="비밀번호를 입력하세요"
        label="비밀번호"
        value={newPassword}
        setValue={setNewPassword}
      />
      <TextInputForm
        placeholder="비밀번호 확인 입력하세요"
        label="비밀번호 확인"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ButtonAtom text="비밀번호 재설정" buttontype="confirm" type="submit" />
    </form>
  );
};

export default PasswordResetForm;
