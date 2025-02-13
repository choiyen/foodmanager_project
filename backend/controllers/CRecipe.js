const { Op } = require("sequelize");
const db = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { bcryptPassword } = require("../utils/encrypt");

const {
  Recipe,
  Step,
  Ingredient,
  RecipeReview,
  RecipeLike,
} = require("../models/index");

const getRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      order: [["createdAt", "DESC"]],
    });
    const reviews = await RecipeReview.findAll();
    if (recipes && reviews) {
      res.json({
        result: true,
        message: "레시피 정보 불러오기 성공",
        data: { recipes, reviews },
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false, message: "레시피 정보를 불러올 수 없습니다." });
  }
};

const getRecipeuser = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const recipes = await Recipe.findAll({
        order: [["createdAt", "DESC"]],
        where: { userID: req.session.userInfo.userid },
      });
      if (recipes) {
        res.json({
          result: true,
          message: "레시피 정보 불러오기 성공",
          recipes,
        });
        res.end();
      } else {
        res.json({ result: true, messsage: "레시피 데이터가 없습니다." });
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인X, 레시피 정보 확인 불가!",
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false, message: "레시피 정보를 불러올 수 없습니다." });
    res.end();
  }
};

async function stepinsert(recipeID, step) {
  //step이라는 stepNo, content를 변수로 가지는 객체 배열을 넘겨 받아, 추가 성공 시 true, 실패 시 false를 반환
  try {
    for (let i = 0; i < step.length; i++) {
      const stepinsert = await Step.create({
        recipeID,
        stepNo: step[i].stepNo,
        content: step[i].content,
      });
      if (stepinsert != null) {
      } else {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}
async function ingredientinsert(recipeID, Ingredients) {
  //Ingredients이라는 ingreName, amount을 변수로 가지는 객체 배열을 넘겨 받아, 추가 성공 시 true, 실패 시 false를 반환

  try {
    for (let i = 0; i < Ingredients.length; i++) {
      const insert = await Ingredient.create({
        recipeID,
        ingreName: Ingredients[i].ingreName,
        amount: Ingredients[i].amount,
      });

      if (insert != null) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
const Recipeinsert = async (req, res) => {
  //recipe table만 완료

  try {
    if (req.session.userInfo) {
      const { title, describe, level, time, amount, steps, Ingredients } =
        req.body;

      //steps은 레시피의 단계 정보가 담겨 있는 객체 배열
      //Ingredients는 레시피의 재료가 들어있는 객체 배열
      //const userID = req.session.userID;
      const RecipeCreate = await Recipe.create({
        userID: req.session.userInfo.userid,
        title,
        describe,
        level,
        time,
        amount,
        img: req.files[0].path,
      });
      let stepon = await stepinsert(RecipeCreate.dataValues.recipeID, steps);

      if (stepon != true) {
        const recipedelete = await Recipe.destroy({
          where: { recipeID: RecipeCreate.dataValues.recipeID },
        });
        res.json({
          result: false,
          message: "해당 레시피 정보를 등록할 수 없습니다.",
        });
        res.end();
      } else {
        let ingredienton = await ingredientinsert(
          RecipeCreate.dataValues.recipeID,
          Ingredients
        );
        if (ingredienton != true) {
          const recipedelete = await Recipe.destroy({
            where: { recipeID: RecipeCreate.dataValues.recipeID },
          });
          res.json({
            result: false,
            message: "해당 레시피 정보를 등록할 수 없습니다.",
          });
          res.end();
        } else {
          res.json({
            result: true,
            message: "해당 레시피 정보를 등록하였습니다.",
          });
          res.end();
        }
      }
    } else {
      res.json({
        result: false,
        message: "로그인X, 레시피 정보 등록 불가!",
      });
      res.end();
    }
  } catch (error) {
    res.json({
      result: false,
      message: "시스템에 에러가 발생했습니다.",
    });
    res.end();
    console.error(error);
  }
};

const Recipeupdate = async (req, res) => {
  //레시피 update 완료

  try {
    if (req.session.userInfo) {
      const { title, describe, category, level, time, steps } = req.body;
      const { recipeID } = req.params;
      const recipe = await Recipe.update(
        {
          title,
          describe,
          category,
          level,
          time,
        },
        {
          where: { userID: req.session.userInfo.userid, recipeID },
        }
      );
      if (recipe != undefined) {
        const step = await Step.destroy({
          where: { recipeID },
        });
        let stepon = await stepinsert(recipeID, steps);
        if (stepon != true) {
          res.json({
            result: false,
            Message: "레시피 업데이트 완료! 단, 요리 순서 업데이트 실패",
          });
          res.end();
        } else {
          const step = await Step.destroy({
            where: { recipeID },
          });
          let ingredienton = await ingredientinsert(
            RecipeCreate.dataValues.recipeID,
            Ingredients
          );
          if (ingredienton != true) {
            res.json({
              result: false,
              Message: "레시피, 요리 순서 업데이트 완료! 단, 재료 등록에 실패",
            });
            res.end();
          } else {
            res.json({
              result: true,
              Message: "레시피 정보를 정상적으로 수정하였습니다.",
            });
            res.end();
          }
        }
      } else {
        res.json({
          result: false,
          Message: "레시피 정보를 수정하는데 실패했습니다.",
        });
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인X, 레시피 정보 수정 불가!",
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.end();
  }
};
const RecipeDelete = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { recipeID } = req.params;
      const Recipefind = await Recipe.findOne({
        where: {
          recipeID,
        },
      });
      if (Recipefind != null) {
        await Recipe.destroy({
          where: { userID: req.session.userInfo.userid, recipeID },
        });
        res.json({
          result: true,
          Message: "정상적으로 해당 레시피를 삭제하였습니다.",
        });
        res.end();
      } else {
        res.json({
          result: false,
          Message: "삭제할 수 있는 레시피가 존재하지 않습니다.",
        });
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인X, 레시피 정보 삭제 불가!",
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.end();
  }
};
const RecipefindOne = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { recipeID } = req.params;
      const Recipefind = await Recipe.findOne({
        where: {
          recipeID,
        },
      });
      if (Recipefind != null) {
        const stepfind = await Step.findAll({
          where: {
            recipeID,
          },
        });
        if (stepfind != null) {
          const ingredientfind = await Ingredient.findAll({
            where: {
              recipeID,
            },
          });
          if (ingredientfind != null) {
            res.json({
              result: true,
              Message: "정상적으로 Recipe data를 찾았습니다.",
              recipe: Recipefind,
              steps: stepfind,
              ingredient: ingredientfind,
            });
            res.end();
          } else {
            res.json({
              result: false,
              Message:
                "데이터베이스에서 레시피에 필요한 재료를 찾을 수 없습니다. 죄송합니다.",
            });
            res.end();
          }
        } else {
          res.json({
            result: false,
            Message:
              "데이터베이스에서 레시피 단계 데이터를 찾을 수 없습니다. 죄송합니다.",
          });
          res.end();
        }
      } else {
        req.json({
          result: false,
          Message:
            "데이터베이스에서 레시피 데이터를 찾을 수 없습니다. 죄송합니다.",
        });
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인X, 레시피 정보 찾기 불가!",
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.end();
  }
};

const RecipeLikeFindAll = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const LikeFindAll = await RecipeLike.findAll({
        where: { userID: req.session.userInfo.userid },
      });
      if (LikeFindAll != null) {
        const recipeID = await LikeFindAll.map(
          (recipeLike) => recipeLike.dataValues.recipeID
        );

        const recipe = await Recipe.findAll({
          where: { recipeID: recipeID },
        });

        const Review = await RecipeReview.findAll({
          where: { recipeID: recipeID },
        });

        if (recipe != null) {
          res.json({
            result: true,
            Message: "스크랩 레시피 목록 불러오기 완료",
            RecipeLike: LikeFindAll,
            recipe: recipe,
            Review: Review,
          });
          res.end();
        } else {
          res.json({
            result: false,
            Message: "스크랩 레시피 목록 불러오기 실패",
            RecipeLike: LikeFindAll,
          });
          res.end();
        }
      } else {
        res.json({
          result: false,
          Message: "불러올 레시피 목록이 없습니다.",
        });
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인X, 레시피 찜목록 찾기 불가!",
      });
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.end();
  }
};

//Recipe 찜 상태 확인
const RecipeLikeFindOne = async (req, res) => {
  try {
    const { recipeID } = req.body;
    const Likefindone = await RecipeLike.findOne({
      where: { userID: req.session.userInfo.userid, recipeID },
    });
    if (Likefindone != null) {
      res.json({
        result: true,
        Message: "레시피 목록 불러오기 완료",
        RecipeLike: Likefindone,
      });
      res.end();
    } else {
      res.json({ Message: "보낼만한 목록이 없습니다." });
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.end();
  }
};

//레시피 찜 상태 변경
const RecipeLikeDB = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { recipeID } = req.body;
      const Likefindone = await RecipeLike.findOne({
        where: { userID: req.session.userInfo.userid, recipeID },
      });
      if (Likefindone != null) {
        const LikeDelete = await RecipeLike.destroy({
          where: { userID: req.session.userInfo.userid, recipeID },
        });
        res.json({
          result: true,
          Message: "좋아하는 레시피에서 삭제하였습니다.",
        });
        res.end();
      } else {
        const Likeinsert = await RecipeLike.create({
          userID: req.session.userInfo.userid,
          recipeID,
        });
        res.json({
          result: true,
          Message: "좋아하는 레시피에 추가하였습니다.",
        });
        res.end();
      }
    } else {
      res.json({
        result: false,
        Message: "로그인X, 좋아하는 레시피 삭제 불가!",
      });
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.end();
  }
};

//레시피에 본인이 단 리뷰 내용
const RecipeReviewMYfind = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const Reviewfindone = await RecipeReview.findOne({
        where: { userID: req.session.userInfo.userid },
      });
      if (Reviewfindone != null) {
        res.json({
          result: true,
          Message: "레시피의 본인 리뷰 불러오기 완료",
          RecipeReview: { Reviewfindone },
        });
        res.end();
      } else {
        res.json({
          result: true,
          Message: "불러올 레시피 없음",
        });
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인이 되어있지 않습니다.",
      });
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.end();
  }
};
//레시피에 달려있는 모든 리뷰 내용
const RecipeReviewFindAll = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { recipeID } = req.body;
      const ReviewfindAll = await RecipeReview.findAll({ where: { recipeID } });
      if (ReviewfindAll != null) {
        res.json({
          result: true,
          Message: "레시피의 리뷰 내용 불러오기 완료",
          RecipeReview: { ReviewfindAll },
        });
        res.end();
      } else {
        res.json({
          result: true,
          Message: "불러올 레시피 내용이 없습니다.",
        });
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인이 되어있지 않습니다.",
      });
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.end();
  }
};

const RecipeReviewinsert = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { recipeID, rating } = req.body;
      const Reviewinsert = await RecipeReview.create({
        userID: req.session.userInfo.userid,
        recipeID,
        rating,
      });
      if (Reviewinsert != null) {
        res.json({ result: true, Message: "별점 추가 완료!" });
        res.end();
      } else {
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인이 되어있지 않습니다.",
      });
      res.end();
    }
  } catch (err) {
    console.error(err);
  }
};

const RecipeReviewupdate = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { recipeID, rating } = req.body;
      const Reviewupdate = await RecipeReview.update(
        { rating },
        { where: { userID: req.session.userInfo.userid, recipeID } }
      );

      if (Reviewupdate != null) {
        res.json({ result: true, Message: "별점이 수정되었습니다!" });
        res.end();
      } else {
        res.json({ result: false, Message: "별점이 없거나 에러 발생!!" });
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인이 되어있지 않습니다.",
      });
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.end();
  }
};

const RecipeReviewGet = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { recipeID } = req.query;
      const Reviewupdate = await RecipeReview.findOne({
        where: { userID: req.session.userInfo.userid, recipeID },
      });

      if (Reviewupdate != null) {
        res.json({ result: true, rating: Reviewupdate.rating }); // 조회 완료 수정기능을 실행
        res.end();
      } else {
        res.json({ result: false }); // 조회 실패 데이터를 생성
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인이 되어있지 않습니다.",
      });
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.end();
  }
};

const RecipeReviewDelete = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { userID, recipeID } = req.body;
      const ReviewDelete = await RecipeReview.destroy({
        where: { userID, recipeID },
      });

      if (ReviewDelete != null) {
        res.json({ result: true, Message: "리뷰 삭제 완료!" });
        res.end();
      } else {
        res.json({ result: false, Message: "삭제할 리뷰 없음" });
        res.end();
      }
    } else {
      res.json({
        result: false,
        message: "로그인이 되어있지 않습니다.",
      });
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.end();
  }
};

module.exports = {
  getRecipe,
  Recipeinsert,
  Recipeupdate,
  RecipeDelete,
  RecipefindOne,
  RecipeLikeDB,
  RecipeLikeFindOne,
  RecipeLikeFindAll,
  RecipeReviewinsert,
  RecipeReviewupdate,
  RecipeReviewDelete,
  RecipeReviewFindAll,
  RecipeReviewMYfind,
  getRecipeuser,
  RecipeReviewGet,
};
//레시피 관련 코드 작성 완료(단, 이미지 업로드 관련 기능은 react 레시피 페이지 완성 후 추가 예정)
//레시피 동작 상황에 대하여 모든 라우터가 작성되었는지 확인
//로그인 기능 완료
