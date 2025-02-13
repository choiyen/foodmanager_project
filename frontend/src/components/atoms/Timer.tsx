import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { PasswordResetContext } from "../pages/PasswordResetPage";
import axios from "axios";
import ButtonAtom from "../atoms/ButtonAtom";

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const passwordcontext = useContext(PasswordResetContext);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [onTimeUp]);

  useEffect(() => {
    onTimeUp();
    if (timeLeft <= 0) {
      axios({
        method: "POST",
        url: "/user/verficationnot",
      }).then((res) => {
        if (res.data.result == true) {
          alert(res.data.message);
          passwordcontext?.setbirthday("");
          passwordcontext?.setEmail("");
          passwordcontext?.setStep(1);
        } else {
          alert(res.data.message);
          passwordcontext?.setbirthday("");
          passwordcontext?.setEmail("");
          passwordcontext?.setStep(1);
        }
      });

      return;
    }
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetcount = (): void => {
    setTimeLeft(initialTime);
  };

  return (
    <div>
      <span>{formatTime(timeLeft)}</span>
      <ButtonAtom
        text="인증번호 연장"
        buttontype="On"
        type="button"
        onClick={resetcount}
      />
    </div>
  );
};

export default Timer;
