import React from "react";
import styled from "styled-components";
import BackButton from "../atoms/BackButton";
import ViewPostingInfo from "../organisms/ViewPostingInfo";
import PostingCommentList from "../organisms/PostingCommentList";

// 포스팅 전체 정보 타입 정의
interface PostingProps {
  postingID: number; // 포스팅 ID
  img: string; // 이미지 URL
  title: string; // 제목
  userID: string; // 작성자 ID
  date: string; // 작성일
  content: string; // 본문 내용
}

interface CommentListProps {
  commentID: number;
  userID: string;
  date: string;
  content: string;
}
const Container = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    width: 50vw;
    margin: 0 auto;
    margin-top: 20px;
  }
`;
const ButtonStyle = styled(BackButton)`
  background-color: white;
  border-radius: 50%;
  top: 30px;
`;

export default function ViewTemplatePosting({
  PostingData,
}: {
  PostingData: PostingProps;
}) {
  return (
    <Container>
      <ButtonStyle position="absolute" />
      <ViewPostingInfo value={PostingData} />
      <PostingCommentList PostingData={PostingData} />
    </Container>
  );
}
