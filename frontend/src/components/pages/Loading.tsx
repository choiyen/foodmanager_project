import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../molecules/Logo";

export default function Loading() {
  const naviagte = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      naviagte("/main");
    }, 2000);
  }, [naviagte]);

  return <Logo />;
}
