const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cmain");
const postController = require("../controllers/Cposting");
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

//router 본인이 작성한 list

// router
router.get("/", postController.getPosting);

router.post("/userselect", postController.getUserPosting);

// posting 등록
router.post("/post", uploadDetail.any(), postController.postPosting);

// posting 수정
router.patch("/edit/:postingID", postController.editPosting);

// posting 삭제
router.delete("/delete/:postingID", postController.deletePosting);

//좋아요를 눌렀는지 여부 확인
router.post("/likepost", postController.Likeing);

// 좋아요 누른 posting 확인 - mypage
router.post("/like", postController.userPostLike);

// posting 상세 화면
router.get("/:postingID", postController.detailPosting);

// posting 댓글 등록
router.post("/:postingID/comment", postController.postComment);

// posting 댓글 수정
router.patch("/:postingID/:commentID/update", postController.editComment);

// posting 댓글 삭제
router.delete("/:postingID/:commentID/delete", postController.deleteComment);

// posting 좋아요 누르기
router.post("/:postingID/like", postController.postLike);

module.exports = router;
