const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cmain");
const groController = require("../controllers/Cgrocery");

router.get("/", groController.getGrocery);

// foodlog 등록
router.post("/post", groController.postGrocery);

// foodlog 수정
router.patch("/edit/:groceryID", groController.editGrocery);

// foodlog 삭제
router.delete("/delete/:groceryID", groController.deleteGrocery);

module.exports = router;
