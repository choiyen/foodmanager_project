import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ImageCard from "../atoms/ImageCard";
import RecipeInfo from "./RecipeInfo";
import IconButtonAtom from "../atoms/IconButtonAtom";
import FeedInfo from "./FeedInfo";
import { Link } from "react-router-dom";
import axios from "axios";
import { feedContext } from "../pages/FilterPosts";
import { ColorSwatch } from "@chakra-ui/react";

interface MainCardProps {
  postingID?: number;
  recipeID?: number;
  img: string;
  alt?: string;
  title: string;
  rating?: number;
  describe?: string;
  type?: "recipe" | "feed";
  userId?: string;
}

const Container = styled.li`
  position: relative;
  width: 350px;
  height: 240px;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 400px;
    height: 350px;
  }
`;
const ImageWrap = styled.div`
  height: 70%;
  overflow: hidden;
  position: relative;
  @media (min-width: 768px) {
    height: 70%;
  }
`;
const StyledImageCard = styled(ImageCard)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const LikeButton = styled(IconButtonAtom)`
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 1;
`;

export default function MainCard({
  postingID,
  recipeID,
  img = "https://picsum.photos/400",
  alt = img,
  title,
  rating = 2.5,
  type = "recipe",
  userId = "user1234",
}: MainCardProps) {
  const [likeState, setLikeState] = useState(false);
  const params = recipeID ? "recipe" : "posting";

  const feedchange = useContext(feedContext);
  async function fetchItems() {
    try {
      const checking = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_ROUTE}/user/check`,
        withCredentials: true,
      });
      return checking.data.result;
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  }
  useEffect(() => {
    async function loginlike() {
      const logincheck = await fetchItems();
      if (logincheck) {
        if (type == "recipe") {
          let recipeLike = await axios({
            method: "POST",
            url: `/Recipe/like`,
            data: {
              recipeID,
            },
          });
          if (recipeLike.data.result == true) {
            setLikeState(recipeLike.data.result);
          } else {
          }
        } else {
          let postingLike = axios({
            method: "POST",
            url: `/posting/likepost`,
            data: {
              postingID,
            },
          }).then((res) => {
            if (res.data.result == true) {
              setLikeState(res.data.result);
            } else {
            }
          });
        }
      }
    }
    loginlike();
  }, []);

  const ChangeLikeState = () => {
    if (type == "recipe") {
      const main = axios({
        method: "POST",
        url: `/Recipe/update/Like`,
        data: {
          recipeID,
        },
      }).then((res) => {
        if (res.data.result == true) {
          setLikeState(!likeState);
          alert(res.data.Message);
          changefeeds();
        } else {
          alert(res.data.Message);
        }
      });
    } else {
      const main = axios({
        method: "POST",
        url: `/posting/${postingID}/like`,
      }).then((res) => {
        if (res.data.result == true) {
          setLikeState(!likeState);
          alert(res.data.message);
          changefeeds();
        } else {
          alert(res.data.message);
        }
      });
    }
  };

  const changefeeds = () => {
    if (likeState == true) {
      if (type == "recipe") {
        const feedobject = feedchange?.userfeeds.filter((feed) => {
          return feed.recipeID != recipeID;
        });
        if (feedobject != undefined) {
          feedchange?.setuserFeeds(feedobject);
        }
      } else {
        const feedobject = feedchange?.userfeeds.filter((feed) => {
          return feed.postingID != postingID;
        });
        if (feedobject != undefined) {
          feedchange?.setuserFeeds(feedobject);
        }
      }
    }
  };

  return (
    <Container>
      <LikeButton
        label="좋아요 버튼"
        icontype="heart"
        color={likeState ? "red" : "#e0e0e0"}
        BGcolor="transparent"
        variant="ghost"
        onClick={() => ChangeLikeState()}
      />
      <Link to={"/main/view/" + (recipeID || postingID) + "?type=" + params}>
        <ImageWrap>
          <StyledImageCard src={img} alt={alt} />
        </ImageWrap>
        {type === "recipe" ? (
          <RecipeInfo title={title} rating={rating} />
        ) : (
          <FeedInfo title={title} userId={userId} />
        )}
      </Link>
    </Container>
  );
}
