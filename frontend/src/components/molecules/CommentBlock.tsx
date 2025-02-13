import React, { useState } from "react";
import styled from "styled-components";
import FeedInfo from "./FeedInfo";
import IconButtonAtom from "../atoms/IconButtonAtom";
import Notification from "../organisms/Notification";
import axios from "axios";
import { usePageRender } from "../organisms/PageRenderContext";
interface PostingData {
  postingID: number; // 포스팅 ID
  img: string; // 이미지 URL
  title: string; // 제목
  userID: string; // 작성자 ID
  date: string; // 작성일
  content: string; // 본문 내용
}

interface CommentBlockProps {
  PostingData: PostingData;
  id: number;
  userId: string;
  date: string;
  content: string;
}
const Container = styled.div`
  position: relative;
  padding: 20px;
  margin-top: 10px;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;
const Comment = styled.p`
  font-size: 13px;
`;
const CloseButton = styled(IconButtonAtom)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export default function CommentBlock({
  id,
  userId,
  date,
  content,
  PostingData,
}: CommentBlockProps) {
  const [display, setDisplay] = useState(false);
  const Alert = () => {
    setDisplay((prev) => !prev);
  };
  const { CommentPageRender, setCommentPageRender } = usePageRender();
  const route = process.env.REACT_APP_ROUTE;
  const DeleteComment = () => {
    const data = axios({
      method: "delete",
      url: `${route}/posting/${PostingData.postingID}/${id}/delete`,
      withCredentials: true,
    })
      .then((response) => {
        // 필요한 후속 작업 추가
        setDisplay((prev) => !prev);
        setCommentPageRender((prev) => !prev);
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
      });
  };
  return (
    <>
      <Container>
        <CloseButton
          label="닫기 버튼"
          icontype="ex"
          color="#bababa"
          size="25px"
          onClick={Alert}
        />
        <FeedInfo title={userId} size="md" />
        <Comment>{content}</Comment>
      </Container>

      <Notification
        title="댓글 삭제"
        message="댓글을 지우시겠습니까?"
        type="info"
        onConfirm={DeleteComment}
        onCancel={() => {
          setDisplay((prev) => !prev);
        }}
        alertDisplay={display}
      />
    </>
  );
}
