import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainCard from "../molecules/MainCard";
import axios from "axios";
import { ColorSwatch } from "@chakra-ui/react";
import { usePageRender } from "../organisms/PageRenderContext";
import { useParams, useSearchParams } from "react-router-dom";

interface FeedData {
  postingID: number;
  title: string;
  userId: string;
  img: string;
}

const FeedList = styled.ul`
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: row;
    width: 850px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  margin-bottom: 100px;
`;
export default function FeedTemplate() {
  const [Postings, setPostings] = useState<FeedData[]>([]);
  const [Postings1, setPostings1] = useState<FeedData[]>([]);

  const [Loading, setLoading] = useState(false);
  const { feedPageRender, setFeedPageRender } = usePageRender();
  const { id } = useParams<{ id: string }>();
  const route = process.env.REACT_APP_ROUTE;
  async function loading() {
    const feedupdate = await axios({
      method: "GET",
      url: `${route}/posting`,
      withCredentials: true,
    });
    setPostings(feedupdate.data.posting);
  }

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${route}/posting`,
      withCredentials: true,
    })
      .then((res) => {
        setPostings(res.data.posting);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [feedPageRender]);

  return (
    <Container>
      {Loading ? (
        <p>Loading...</p>
      ) : (
        <FeedList>
          {Postings && Postings.length > 0 ? (
            Postings.map((feed) => (
              <MainCard
                key={feed.postingID}
                postingID={feed.postingID}
                title={feed.title}
                userId={feed.userId}
                img={feed.img}
                type="feed"
              />
            ))
          ) : (
            <p>No data available</p>
          )}
        </FeedList>
      )}
    </Container>
  );
}
