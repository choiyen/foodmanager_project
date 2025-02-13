const { Op } = require("sequelize");
const db = require("../models");
const sequelize = require("sequelize");

const { Grocery } = require("../models/index"); //controller에서 필요한 것만 가져온다.

exports.getGrocery = async (req, res) => {
  try {
    const grocery = await Grocery.findAll();
    res.json(grocery);
    res.end();
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

// 푸드로그 등록
exports.postGrocery = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { category, groceryname, amount, unit, expiration } = req.body;

      if (!category || !groceryname || !amount || !unit || !expiration) {
        return res.status(400).json({
          result: false,
          message: "필수 정보가 누락되었습니다.",
        });
      }
      const date = new Date(expiration).getTime();
      const today = new Date().getTime();
      if (date <= today) {
        return res.status(400).json({
          result: false,
          message: "이미 유통기한이 지난 음식입니다.",
        });
        res.end();
      } else {
        await Grocery.create({
          userID: req.session.userInfo.userid,
          category: category,
          groceryname: groceryname,
          amount: amount,
          unit: unit,
          expiration: expiration,
        });
        res.json({
          result: true,
          message: "정상적으로 푸드 로그가 등록되었습니다.",
        });
        res.end();
      }
    } else {
      res.status(400).json({
        result: false,
        message: "로그인이 되어 있지 않습니다.",
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.end();
  }
};

// 푸드로그 수정
exports.editGrocery = async (req, res) => {
  try {
    const { groceryID } = req.params;
    const grocery = await Grocery.findOne({
      where: { groceryID: groceryID },
    });

    const { userID } = grocery;

    // 세션에 저장된 userid와 log의 userID 일치할 경우 수정 가능
    if (req.session.userInfo.userid === userID) {
      const { category, groceryname, amount, unit, expiration } = req.body;
      await Grocery.update(
        {
          category: category,
          groceryname: groceryname,
          amount: amount,
          unit: unit,
          expiration: expiration,
        },
        {
          where: { groceryID: groceryID },
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

// 푸드로그 삭제
exports.deleteGrocery = async (req, res) => {
  try {
    const { groceryID } = req.params;
    const grocery = await Grocery.findOne({
      where: { groceryID: groceryID },
    });

    const { userID } = grocery;

    // 세션에 저장된 userid와 log의 userID 일치할 경우 삭제 가능
    if (req.session.userInfo.userid === userID) {
      await Grocery.destroy({
        where: { groceryID: groceryID },
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
