import React, { useState } from "react";
import InputField from "./InputField";

const ParentComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <InputField
      label="이메일"
      id="email"
      name="email"
      type="email"
      value={inputValue}
      placeholder="이메일을 입력하세요"
      onChange={handleInputChange}
    />
  );
};

export default ParentComponent;
