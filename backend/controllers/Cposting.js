const { Op } = require("sequelize");
const db = require("../models");
const sequelize = require("sequelize");

const {
  User,
  FoodLog,
  Recipe,
  Step,
  Ingredient,
  RecipeReview,
  RecipeLike,
  Posting,
  PostComment,
  PostLike,
  Grocery,
} = require("../models/index");

exports.getUserPosting = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const posting = await Posting.findAll({
        attributes: ["postingID", "title", "userId", "img"],
        order: [["createdAt", "DESC"]],
        where: { userID: req.session.userInfo.userid },
      });

      res.json({
        result: true,
        message: "개인의 posting 정보 불러오기 성공",
        posting,
      });
      res.end();
    } else {
      res.json({
        result: false,
        message: "로그인X, 포스트 정보 확인 불가!",
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

exports.getPosting = async (req, res) => {
  try {
    const posting = await Posting.findAll({
      attributes: ["postingID", "title", "userId", "img"],
      order: [["createdAt", "DESC"]],
    });

    res.json({ result: true, message: "데이터가 존재합니다.", posting });
    res.end();
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

exports.postPosting = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { title, content } = req.body;

      await Posting.create({
        title: title,
        userID: req.session.userInfo.userid,
        content: content,
        img: req.files[0].path,
      });
      res.json({ result: true, message: "정상적으로 post가 성공했습니다." });
      res.end();
    } else {
      res.json({
        result: false,
        error: "1",
        message: "로그인X, 포스트 정보 등록 불가!",
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({
      result: false,
      error: "2",
      message: "시스템에 에러가 발생했습니다.",
    });
    res.end();
  }
};

exports.editPosting = async (req, res) => {
  try {
    const { postingID } = req.params;
    const posting = await Posting.findOne({
      where: { postingID: postingID },
    });

    const { userID } = posting;

    if (req.session.userInfo.userid === userID) {
      const { title, content } = req.body;
      await Posting.update(
        {
          title: title,
          content: content,
        },
        {
          where: { postingID: postingID },
        }
      );
      res.json({ result: true });
      res.end();
    } else {
      res.json({ result: false });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

exports.deletePosting = async (req, res) => {
  try {
    const { postingID } = req.params;
    const posting = await Posting.findOne({
      where: { postingID: postingID },
    });

    const { userID } = posting;

    if (req.session.userInfo.userid === userID) {
      await Posting.destroy({
        where: { postingID: postingID },
      });

      res.json({ result: true });
      res.end();
    } else {
      res.json({ result: false });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

exports.detailPosting = async (req, res) => {
  try {
    const { postingID } = req.params;

    const posting = await Posting.findOne({
      where: { postingID: postingID },
    });

    const comment = await PostComment.findAll({
      where: { postingID: postingID },
    });

    const like = await PostLike.findAll({
      where: { postingID: postingID },
    });
    res.json({ result: true, posting, comment, like });
    res.end();
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

exports.postComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postingID } = req.params;

    if (req.session.userInfo) {
      const userID = req.session.userInfo.userid;

      await PostComment.create({
        userID: userID,
        postingID: postingID,
        content: content,
      });
      res.json({ result: true });
      res.end();
    } else {
      res.json({
        result: false,
        message: "로그인 후에 댓글을 달 수 있습니다.",
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

// comment 수정
exports.editComment = async (req, res) => {
  try {
    const userID = req.session.userInfo.userid;
    const { commentID } = req.params;

    if (req.session.userInfo) {
      const { title, content } = req.body;
      await PostComment.update(
        {
          title: title,
          content: content,
        },
        {
          where: { commentID: commentID, userID: userID },
        }
      );
      res.json({ result: true, message: "댓글 수정 성공" });
      res.end();
    } else {
      res.json({ result: false, message: "사용자가 작성하지 않은 글입니다." });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

// comment 삭제
exports.deleteComment = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const userID = req.session.userInfo.userid;
      const { commentID } = req.params;
      await PostComment.destroy({
        where: { commentID: commentID, userID: userID },
      });
      res.json({ result: true, message: "댓글 삭제 성공" });
      res.end();
    } else {
      res.json({ result: false, message: "사용자가 작성하지 않은 글입니다." });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

exports.postLike = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const userID = req.session.userInfo.userid;
      const { postingID } = req.params;
      const isLike = await PostLike.findOne({
        where: { userID: userID, postingID: postingID },
      });
      if (!isLike) {
        await PostLike.create({
          userID: userID,
          postingID: postingID,
        });
        res.json({ result: true, message: "좋아요" });
        res.end();
      } else {
        await PostLike.destroy({
          where: { userID: userID, postingID: postingID },
        });
        res.json({ result: true, message: "좋아요 취소" });
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인 후에 좋아요를 누를 수 있습니다.",
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.end();
  }
};

// 좋아요 누른 항목
exports.userPostLike = async (req, res) => {
  try {
    // 게시물
    const postLikes = await PostLike.findAll({
      where: { userID: req.session.userInfo.userid },
    });

    const postingID = postLikes.map(
      (postLike) => postLike.dataValues.postingID
    );

    const posting = await Posting.findAll({
      where: { postingID: postingID },
    });

    res.json({ result: true, posting });
    res.end();
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

// 해당 항목에 좋아요를 눌렀는지 여부 확인
exports.Likeing = async (req, res) => {
  try {
    if (req.session.userInfo) {
      // 게시물
      const { postingID } = req.body;

      const postLikes = await PostLike.findOne({
        where: { userID: req.session.userInfo.userid, postingID },
      });

      if (postLikes !== null) {
        res.json({ result: true, message: "좋아요를 누른 항목입니다." });
        res.end();
      } else {
        res.json({
          result: false,
          message: "좋아요를 누르지 않은 항목입니다.",
        });
        res.end();
      }
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};
