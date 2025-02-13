const { Op } = require("sequelize");
const db = require("../models");
const sequelize = require("sequelize");
const { DefaultRecipe } = require("../models/index");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // s3 설정
// const {
//   S3Client,
//   PutObjectCommand,
//   DeleteObjectCommand,
// } = require("@aws-sdk/client-s3");
// const uuid = require("uuid").v4;
// const path = require("path");
// const fs = require("fs");
// require("dotenv").config();
// const multer = require("multer");
// // Multer 설정 (파일을 uploads/ 디렉터리에 저장)
// const upload = multer({ dest: "uploads/" });
// // s3 설정
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });
// const bucketName = "foodmanager";
// // multer 세부 설정
// const uploadDetail = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, "uploads/");
//     },
//     filename(req, file, done) {
//       // 파일이름에 uuid 설정
//       // const ext = path.extname(file.originalname);
//       const uniqueName = uuid() + path.extname(file.originalname);
//       done(null, uniqueName);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 }, //5MB
//   fileFilter(req, file, done) {
//     // 확장자 검사
//     // 정규표현식 업로드 허용된 파일 확장자 목록
//     const allowedTypes = /jpeg|jpg|png|bmp/;
//     // 파일의 확장자를 추출하는 코드
//     // toLowerCase() 확장자를 소문자로 변환하여 대소문자 구분없이 검사 가능
//     // JPG나 jpg
//     const extname = allowedTypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     // MIME 타입이 image/jpeg image/png 검사함
//     // 조건이 맞으면 true 아니면 false
//     const mimetype = allowedTypes.test(file.mimetype);
//     if (extname && mimetype) {
//       return done(null, true);
//     } else {
//       return done(new Error("허용되지 않는 확장자 입니다."));
//     }
//   },
// });

// // 파일 s3에 업로드
// const uploadToS3 = async (filePath, bucketName, keyName) => {
//   try {
//     // 업로드할 파일 경로 및 내용 준비
//     const fileStream = fs.createReadStream(filePath);

//     // s3에 업로드할 객체 설정
//     const uploadParms = {
//       Bucket: bucketName,
//       Key: keyName,
//       Body: fileStream,
//     };

//     // s3에 파일 업로드
//     const data = await s3.send(new PutObjectCommand(uploadParms));
//     return `https://${bucketName}.s3.amazonaws.com/${keyName}`;
//   } catch (err) {
//     console.error("Error uploading file to S3", err);
//     throw err; // 에러 처리
//   }
// };

// // 이미지가 수정되면 기존 s3에 있는 이미지 삭제
// async function deleteImageFromS3(bucketName, ImageUrl) {
//   const imageKey = ImageUrl.split(".amazonaws.com/")[1];

//   const params = {
//     Bucket: bucketName,
//     Key: imageKey,
//   };
//   try {
//     const command = new DeleteObjectCommand(params);
//     await s3.send(command);
//   } catch (error) {
//     console.error("이미지 삭제 실패", error);
//     throw new Error("이미지 삭제에 실패하였습니다.");
//   }
// }

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processIngredient(data) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `이 데이터를 배열형식으로 정리해줘 [{ingredientID, ingreName, amount}, {ingredientID, ingreName, amount}] 형식으로, ${data} \n 이에 대한 부가설명은 달지 않아도 됨.`;
    const result = await model.generateContent(prompt);

    const cleanedString = result.response
      .text()
      .replace(/[\n\r]/g, "") // 줄바꿈 제거
      .replace(/\\n/g, "") // \n 제거
      .replace(/\\'/g, "'") // \\' 제거 (필요시)
      .replace(/```json|```/g, "");

    // JSON으로 파싱
    const jsonArray = JSON.parse(cleanedString);

    return jsonArray;
  } catch (error) {
    if (error.status === 429) {
      console.warn("API 요청 제한: 잠시 대기 후 재시도합니다.");
      await sleep(5000); // 5초 대기 후 재시도
      return processIngredient(data); // 재귀 호출로 재시도
    } else {
      console.error("API 호출 중 오류 발생:", error);
      return "오류 발생"; // 기본값 반환
    }
  }
}

function processSteps(recipe) {
  // MANUAL01 필드가 존재하는지 먼저 확인
  if (!recipe.MANUAL01) {
    // MANUAL01이 없다면 해당 레시피는 건너뛰기
    return null;
  }

  const steps = [];

  // MANUAL01부터 순차적으로 체크하며 메뉴얼 정보 추출
  for (let i = 1; i <= 20; i++) {
    const key = `MANUAL${String(i).padStart(2, "0")}`;
    if (recipe[key] && recipe[key].trim() !== "") {
      steps.push({ stepNo: i, content: recipe[key] });
    }
  }

  return steps.length > 0 ? steps : null; // 유효한 메뉴얼 정보가 있을 경우만 반환
}

exports.fetchDataAndSave = async (req, res) => {
  try {
    const response = await axios.get(
      // "http://openapi.foodsafetykorea.go.kr/api/b03dee38a26f4a3aa492/COOKRCP01/json/1/20"
      "http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/5"
    );
    const recipes = response.data.COOKRCP01.row;
    if (!recipes || !Array.isArray(recipes)) {
      throw new Error("유효하지 않은 데이터");
    }

    const processedData = recipes
      .map((recipe) => {
        const steps = processSteps(recipe);

        if (steps) {
          return {
            id: recipe.RCP_SEQ,
            title: recipe.RCP_NM,
            img: recipe.ATT_FILE_NO_MK,
          };
        }
        return null;
      })
      .filter((recipe) => recipe !== null);

    res.json({
      result: true,
      message: "기본 레시피 불러오기 성공",
      data: processedData,
    });
  } catch (error) {
    console.error(error);
    res.json({ result: false, message: "기본 레시피 불러오기 실패" });
  }
};

exports.detailAPI = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      // "http://openapi.foodsafetykorea.go.kr/api/b03dee38a26f4a3aa492/COOKRCP01/json/1/10"
      "http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/5"
    );
    const recipes = response.data.COOKRCP01.row;

    const recipe = recipes.filter((recipe) => {
      return recipe.RCP_SEQ === id;
    });

    const ingredients = await processIngredient(recipe[0].RCP_PARTS_DTLS);
    const steps = processSteps(recipe[0]);

    const result = {
      id: id,
      title: recipe[0].RCP_NM,
      img: recipe[0].ATT_FILE_NO_MK,
      describe: `${recipe[0].INFO_ENG}kcal (탄수화물 ${recipe[0].INFO_CAR}g, 지방 ${recipe[0].INFO_FAT}g, 단백질 ${recipe[0].INFO_PRO}g)`,
      category: recipe[0].RCP_PAT2,
      ingredients: ingredients,
      steps: steps,
    };

    res.json({ result: true, message: "레시피 불러오기 성공", data: result });
    res.end();
  } catch (error) {
    console.error(error);
    res.json({ result: false, message: "레시피 불러오기 실패" });
    res.end();
  }
};
