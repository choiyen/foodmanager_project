import React from "react";
import styled from "styled-components";
import ViewImage from "../molecules/ViewImage";
import HeadingAtom from "../atoms/HeadingAtom";
import FeedInfo from "../molecules/FeedInfo";

interface PostingDataProps {
  img: string;
  title: string;
  userID: string;
  date: string;
  content: string;
}
const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.5;
`;

const PostingInfo = styled.section`
  padding: 20px;
`;

const Container = styled.div`
  background-color: #ffffff;
`;

export default function ViewPostingInfo({
  value,
}: {
  value: PostingDataProps;
}) {
  return (
    <Container>
      <ViewImage value={value.img} />

      <PostingInfo>
        <HeadingAtom level={2} $marginBottom="10px">
          {value.title}
        </HeadingAtom>
        <FeedInfo title={value.userID} />
        <Paragraph>{value.content}</Paragraph>
      </PostingInfo>
    </Container>
  );
}
