import React from "react";
import styled from "styled-components";
import CommentBlock from "../molecules/CommentBlock";
import CommentForm from "../molecules/CommentForm";
import { useContext } from "react";
import { CommentContext } from "../pages/View";
type CommentContextType = {
  CommentList: {
    commentID: number;
    userID: string;
    date: string;
    content: string;
  }[];
  setCommentList: React.Dispatch<
    React.SetStateAction<
      { commentID: number; userID: string; date: string; content: string }[]
    >
  >;
};
interface CommentListProps {
  commentID: number;
  userID: string;
  date: string;
  content: string;
}
interface PostingData {
  postingID: number; // 포스팅 ID
  img: string; // 이미지 URL
  title: string; // 제목
  userID: string; // 작성자 ID
  date: string; // 작성일
  content: string; // 본문 내용
}

interface postingIDProps {
  postingID: number;
}
const Container = styled.div``;
const List = styled.ul`
  margin-top: 20px;
  margin-bottom: 100px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding-bottom: 80px;

  @media (min-width: 768px) {
    width: 50vw;
    margin: 0 auto;
  }
`;
const ListItem = styled.li``;
export default function PostingCommentList({
  PostingData,
}: {
  PostingData: PostingData;
}) {
  const data = useContext(CommentContext);
  return (
    <Container>
      <List>
        {data?.CommentList.map((item: CommentListProps) => (
          <ListItem key={item.commentID}>
            <CommentBlock
              PostingData={PostingData}
              id={item.commentID}
              userId={item.userID}
              date={item.date}
              content={item.content}
            />
          </ListItem>
        ))}
      </List>
      <CommentForm />
    </Container>
  );
}
