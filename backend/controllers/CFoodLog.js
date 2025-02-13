const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../models");
const sequelize = require("sequelize");
const { update } = require("sequelize/lib/model");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const { FoodLog, User } = require("../models/index"); //controller에서 필요한 것만 가져온다.
const { RecipefindOne } = require("./CRecipe");

exports.getLog = async (req, res) => {
  try {
    const { kcalPerDay } = await User.findOne({
      where: { userID: req.session.userInfo.userid },
    });
    const { startDate } = req.query;
    const log = await FoodLog.findAll({
      where: {
        userID: req.session.userInfo.userid,
        when: startDate,
      },
    });
    res.json({ log, kcalPerDay });
    res.end();
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

async function processKcal(kcal, foodname, amount, unit) {
  if (kcal === "") {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `${foodname}를 ${amount}${unit}만큼 먹었다고 할 때 대략적인 칼로리를 알려줘. 부가설명 필요없고 숫자만 알려줘.`;

    const result = await model.generateContent(prompt);

    const cleanedString = result.response
      .text()
      .replace(/[\n\r]/g, "") // 줄바꿈 제거
      .replace(/\\n/g, "") // \n 제거
      .replace(/\\'/g, "'") // \\' 제거 (필요시)
      .replace(/```json|```/g, "");

    return cleanedString;
  } else {
    return kcal;
  }
}

// 푸드로그 등록
exports.postLog = async (req, res) => {
  try {
    if (req.session.userInfo) {
      const { category, foodname, amount, unit, kcal, mealtype, when } =
        req.body;

      const kcalResult = await processKcal(kcal, foodname, amount, unit);

      await FoodLog.create({
        userID: req.session.userInfo.userid,
        category: category,
        foodname: foodname,
        amount: amount,
        unit: unit,
        kcal: kcalResult,
        mealtype: mealtype,
        when: when,
      });
      res.json({
        result: true,
        message: "정상적으로 데이터가 업로드되었습니다.",
      });
      res.end();
    } else {
      res.json({ result: false, message: "로그인이 되어 있지 않습니다." });
      res.end();
    }
  } catch (error) {
    res.json({ result: false });
    console.error(error);
    res.end();
  }
};

// 푸드로그 수정
exports.editLog = async (req, res) => {
  try {
    const { when, logID } = req.params;
    const log = await FoodLog.findOne({
      where: { logID: logID },
    });

    const { userID } = log;

    // 세션에 저장된 userid와 log의 userID 일치할 경우 수정 가능
    if (req.session.userInfo.userid === userID) {
      const { category, foodname, amount, unit, kcal, mealtype } = req.body;
      await FoodLog.update(
        {
          category: category,
          foodname: foodname,
          amount: amount,
          unit: unit,
          kcal: kcal,
          mealtype: mealtype,
        },
        {
          where: { logID: logID },
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
exports.deleteLog = async (req, res) => {
  try {
    const { when, logID } = req.params;
    const log = await FoodLog.findOne({
      where: { logID: logID },
    });

    const { userID } = log;

    // 세션에 저장된 userid와 log의 userID 일치할 경우 삭제 가능
    if (req.session.userInfo.userid === userID) {
      await FoodLog.destroy({
        where: { logID: logID },
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
