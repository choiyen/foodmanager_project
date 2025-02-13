const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../models");
const sequelize = require("sequelize");
const { bcryptPassword, compareFunc } = require("../utils/encrypt");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cookieparser = require("cookie-parser");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const express = require("express");
const user = express();
user.use(cookieparser());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const {
  User,
  Posting,
  PostLike,
  Recipe,
  RecipeLike,
} = require("../models/index");

// 하루 섭취 칼로리 계산
async function kcalCalculate(birthday, gender) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `성별은 ${gender}이고, 생일이 ${birthday}일 때, 나이와 성별을 기준으로 하루 권장 칼로리를 계산해줘. 숫자만 반환해줘`;

    const result = await model.generateContent(prompt);
    const cleanedData = result.response
      .text()
      .replace(/[\n\r]/g, "") // 줄바꿈 제거
      .replace(/\\n/g, "") // \n 제거
      .replace(/\\'/g, "'") // \\' 제거 (필요시)
      .replace(/```json|```/g, "");

    return cleanedData;
  } catch (error) {
    if (error.status === 429) {
      console.warn("API 요청 제한: 잠시 후 재시도합니다.");
      await sleep(5000);
      return kcalCalculate(birthday, gender);
    } else {
      console.error("API 호출 중 오류 발생: ", error);
      return "오류 발생";
    }
  }
}

// 회원가입
exports.postUser = async (req, res) => {
  try {
    const { userid, name, pw, birthday, gender } = req.body;
    const isExist = await User.findAll({
      where: { userID: userid },
    });
    if (isExist.length === 0) {
      const kcalPerDay = await kcalCalculate(birthday, gender);
      const hash = bcryptPassword(pw);
      await User.create({
        userID: userid,
        name: name,
        pw: hash,
        birthday: birthday,
        gender: gender,
        kcalPerDay: kcalPerDay,
      });
      res.json({
        result: true,
        message: ["회원가입 성공", "계정이 성공적으로 생성되었습니다."],
      });
      res.end();
    } else {
      res.json({
        result: false,
        message: ["중복된 계정", "이미 존재하는 아이디입니다."],
      });
      res.end();
    }
  } catch (error) {
    res.json({
      result: false,
      message: ["회원가입 실패", "계정 생성에 실패하였습니다."],
    });
    console.error(error);
    res.end();
  }
};

// 로그인 (세션)
exports.userLogin = async (req, res) => {
  try {
    const { userid, pw } = req.body;
    const isExist = await User.findOne({
      where: { userID: userid },
    });

    if (isExist) {
      const hashPw = isExist.dataValues.pw;
      const isMatch = compareFunc(pw, hashPw);

      if (isMatch) {
        req.session.userInfo = {
          userid: isExist.dataValues.userID,
          name: isExist.dataValues.name,
        };

        res.json({
          result: true,
          message: "로그인 성공",
          userid: req.session.userInfo.userid,
        });
      } else {
        res.json({ result: false, message: "비밀번호가 일치하지 않습니다." });
      }
    } else {
      res.json({ result: false, message: "아이디가 존재하지 않습니다." });
    }
  } catch (error) {
    console.error(error);
    res.json({
      result: false,
      message: "로그인 실패",
    });
    res.end();
  }
};

// 로그아웃
exports.userLogout = async (req, res) => {
  try {
    // 'domain'을 제거하고 'path'만 설정
    if (req.session.userInfo) {
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
        }
        res.clearCookie("connect.sid", { secure: false });
        res.json({
          result: true,
          message: "세션 삭제에 성공",
          session: req.session,
        }); // 이미 세션이 없을 경우
        res.end();
      });
    } else {
      res.json({ result: true, message: "이미 세션이 삭제되어 있음" }); // 이미 세션이 없을 경우
      res.end();
    }
  } catch (error) {
    console.error("현재 에러가 발생함 :", error);
    res.json({ result: false, message: error });
    res.end();
  }
};

// 회원정보 수정
exports.editUser = async (req, res) => {
  try {
    const { name, pw, birthday, gender } = req.body;

    // 필수 정보: 이름, 비번, 이메일
    if (name != null && pw != null) {
      await User.update(
        {
          name: name,
          pw: pw,
          birthday: birthday,
          gender: gender,
          email: email,
        },
        { where: { userID: req.session.userInfo.userid } }
      );
      res.json({ result: true, message: "수정이 완료되었습니다." });
      res.end();
    } else {
      res.json({
        result: false,
        message: "입력되지 않은 정보가 있습니다. 필수 항목을 입력해주세요.",
      });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

// 비밀번호 찾기
// exports.findPW = async (req, res) => {

// }

// 회원탈퇴
exports.userDelete = async (req, res) => {
  try {
    await User.destroy({
      where: { userID: req.session.userInfo.userid },
    });
    res.json({ result: true });
    res.end();
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

// 회원정보 가져오기
exports.userSearch = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { userID: req.session.userInfo.userid },
    });

    res.json({ result: user });
    res.end();
  } catch (error) {
    console.error(error);
    res.json({ result: false });
    res.end();
  }
};

// 로그인 상태 확인
exports.userCheck = async (req, res) => {
  try {
    if (req.session.userInfo) {
      res.json({ result: true, message: "현재 세션이 살아있습니다." });
      res.end();
    } else {
      res.json({ result: false, message: "현재 세션이 죽었습니다." });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.json({ result: false, message: "세션이 죽었는지 살았는지 확인 불가!" });
    res.end();
  }
};

const nodemailer = require("nodemailer");
const { config } = require("dotenv");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "naver", // 이메일
  host: "smtp.naver.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // 발송자 이메일
    pass: process.env.EMAIL_PASSWORD, // 발송자 비밀번호
  },
});

function setCookie(name, value) {
  // 현재 시간 구하기
  const now = new Date();
  // 만료 시간을 3분 후로 설정
  now.setTime(now.getTime() + 1000 * 60 * 1000); // 10분을 밀리초로 변환(임의의 큰수로 지정, 프론트 단에서 제어)
  // 쿠키 설정 (만료 시간 포함)
  cookie = `${name}=${value}; expires=${now.toUTCString()}; path=/`;

  return;
}
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = cookie.split(";");

  // 모든 쿠키를 순회하여 원하는 쿠키 찾기
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length); // 쿠키 값 반환
    }
  }
  return null; // 쿠키가 없으면 null 반환
}

//인증번호 보내는 라우터
exports.userselect = async (req, res) => {
  const { userID, birthday } = req.body;

  const Userfind = await User.findOne({ where: { userID, birthday } });
  if (Userfind != null) {
    let count = Math.floor(100000 * Math.random());

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userID,
      subject: "이메일 비밀번호 인증",
      html: `<h1>이메일 인증</h1>
              <div>
                아래 버튼의 인증번호를 서버에 입력해주세요.
                인증번호 : ${count}
              </div>`,
      text: "인증메일입니다.",
    };
    await transporter.sendMail(mailOptions);
    setCookie("count", count);
    res.json({ result: true, Message: "인증번호 보내기 완료", count });
    res.end();
  } else {
    res.json({
      result: false,
      message: "로그인 정보를 찾을 수 없습니다.",
    });
    res.end();
  }
};
function deleteCookie(name) {
  const now = new Date();
  now.setTime(now.getTime() - 1); // 과거 시간을 설정하여 쿠키 삭제
  // 쿠키 삭제 (만료 시간을 과거로 설정)
  cookie = `${name}=; expires=${now.toUTCString()}; path=/`;
  return;
}

exports.Certifications = async (req, res) => {
  try {
    const { userID, count } = req.body;
    const Certification = await getCookie("count");
    console.log(Certification);
    if (Certification == count) {
      res.json({
        result: true,
        Message: "정확한 인증번호를 입력하셨습니다.",
      });
    } else if (Certification != count) {
      res.json({
        result: false,
        Message: "인증번호에 오류가 있어서 비밀번호 변경 불가",
      });
    }

    res.end();
  } catch (err) {
    console.error(err);
    res.json({
      result: false,
      Message: "인증번호가 만료 or 생성X, 아니면 기능 오류",
    });
    res.end();
  }
};

exports.PWchange = async (req, res) => {
  try {
    const { userID, pw } = req.body;
    const hash = bcryptPassword(pw);
    const change = User.update({ pw: hash }, { where: { userID } });
    if (change != null) {
      deleteCookie("count");
      res.json({
        result: true,
        Message: "비밀번호가 정상적으로 변경되었습니다.",
      });
      res.end();
    } else {
      deleteCookie("count");
      res.json({
        result: false,
        Message: "비밀번호 변경에 실패하였습니다.",
      });
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.json({
      result: false,
      Message: "인증번호가 만료 or 생성X, 아니면 기능 오류",
    });
    res.end();
  }
};

//인증번호의 존재 유무를 확인하는 코드를 클라이언트 단에서 작성해야 함.
exports.verficationnot = async (req, res) => {
  const Certification = await getCookie("count");
  if (Certification != undefined) {
    deleteCookie("count");
    res.json({ result: true, message: "인증번호 만료" });
  } else {
    res.json({ result: false, message: "인증번호가 없거나 확인되지 않음" });
  }
};
