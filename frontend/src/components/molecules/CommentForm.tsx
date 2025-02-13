import React, { useCallback, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import IconButtonAtom from "../atoms/IconButtonAtom";
import { FaCircleArrowUp } from "react-icons/fa6";
import axios from "axios";
import { CommentContext } from "../pages/View";
import { useContext } from "react";
const Form = styled.form`
  position: fixed;
  z-index: 15;

  bottom: 60px;
  background-color: #ffffff;
  width: 100%;
  height: 80px;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    bottom: 0;
    left: 150px;
    width: calc(100vw - 120px);
    margin-top: 20px;
  }
`;
const Input = styled.input`
  background-color: #ffffff;
  box-shadow: inset 0 0px 5px rgba(0, 0, 0, 0.25);
  width: 90%;
  height: 45px;
  border-radius: 20px;
  padding-left: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Button = styled.button`
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-50%);
  background-color: #ffffff;
  border-radius: 50%;
`;
interface CommentListProps {
  commentID: number;
  userID: string;
  date: string;
  content: string;
}
export default function CommentForm() {
  const [content, setcontent] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const text = useContext(CommentContext);
  const contented = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (content !== "") {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_ROUTE}/posting/${id}/comment`,
          data: {
            content: content,
          },
          withCredentials: true,
        }).then((res) => {
          if (res.data.result == true) {
            axios({
              method: "GET",
              url: `${process.env.REACT_APP_ROUTE}/posting/${id}`,
              withCredentials: true,
            }).then((res) => {
              text?.setCommentList(res.data.comment);
              setcontent("");
            });
          } else {
            alert(res.data.message);
          }
        });
      } else {
        alert("댓글창 미입력!! 입력해주세요.");
      }
    },
    [content]
  );
  return (
    <Form
      onSubmit={(e) => {
        contented(e);
      }}
    >
      <Input
        type="text"
        placeholder="댓글을 입력해 주세요"
        value={content}
        onChange={(e) => {
          setcontent(e.target.value);
        }}
      />
      <Button type="submit">
        <FaCircleArrowUp size={35} color="#FE8D00" />
      </Button>
    </Form>
  );
}
