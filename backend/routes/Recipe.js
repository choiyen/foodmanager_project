const express = require("express");
const router = express.Router();
const controller = require("../controllers/CRecipe");
//multer 관련 설정
const multer = require("multer");
const path = require("path"); // 경로 처리를 위한 내장 모듈

const uploadDetail = multer({
  // storage : 저장할 공간에 대한 정보
  storage: multer.diskStorage({
    // destination : 경로 설정
    destination(req, file, done) {
      // done: callback function
      // done(null, "~~") 여기서 null은 error를 의미하는 매개변수
      // 에러가 없으므로 "null" 이라고 전달하여 콜백함수를 호출
      done(null, "uploads/");
    },
    filename(req, file, done) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf-8"
      ); //인코딩
      const ext = path.extname(file.originalname); // 파일 "확장자"를 추출

      // 실습
      done(null, path.basename(file.originalname, ext) + ext);
    },
    // limits : 파일 제한 정보
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  }),
});

router.get("/", controller.getRecipe);

router.post("/insert", uploadDetail.any(), controller.Recipeinsert); //레시피를 추가를 요청하는 router

router.get("/find/:recipeID", controller.RecipefindOne); // 레시피의 정보를 찾는 라우터

router.post("/update/Like", controller.RecipeLikeDB); // 레시피의 찜 정보를 업데이트

router.post("/finds/Like", controller.RecipeLikeFindAll); // 레시피 전체 찜 목록

router.post("/insert/review", controller.RecipeReviewinsert); //레시피 별점 추가

router.patch("/update/review", controller.RecipeReviewupdate); //레시피 별점 수정

router.get("/get/review", controller.RecipeReviewGet); //레시피 별점 조회

router.patch("/update/:recipeID", controller.Recipeupdate); //레시피의 update를 담당

router.delete("/delete/Review", controller.RecipeReviewDelete); // 레시피 리뷰 삭제.

router.delete("/delete/:recipeID", controller.RecipeDelete); //레시피를 삭제 요청

router.post("/find/reviews", controller.RecipeReviewFindAll);
//레시피의 전체 리뷰를 가져옴 - 레시피 가져오는 코드가 길어져 가독성이 떨어지는 듯?

router.post("/find/myreview", controller.RecipeReviewMYfind);
//자신이 남긴 리뷰 목록

router.post("/find/user", controller.getRecipeuser);

router.post("/like", controller.RecipeLikeFindOne); //레시피 클릭 시 찜 정보 확인 목적

module.exports = router;
