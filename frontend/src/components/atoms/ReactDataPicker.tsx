import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { IoMdArrowDropdown } from "react-icons/io";

const CalanderButton = styled.button`
  color: #121212;
  cursor: pointer;
  width: 240px;
  padding: 10px;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
`;

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  className?: string;
}
interface StateProps {
  startDate: Date | null;
  setStartDate: (e: Date | null) => void;
}

export default function ReactDataPicker({
  startDate,
  setStartDate,
}: StateProps) {
  // const [startDate, setStartDate] = useState<Date | null>(new Date());

  const ExampleCustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick, className }, ref) => (
      <CalanderButton className={className} onClick={onClick} ref={ref}>
        {value}
        <IoMdArrowDropdown />
      </CalanderButton>
    )
  );
  ExampleCustomInput.displayName = "ExampleCustomInput";

  return (
    <DatePicker
      locale={ko}
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      customInput={<ExampleCustomInput className="example-custom-input" />}
      dateFormat="yyyy년 MM월 dd일"
    />
  );
}
