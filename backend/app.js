const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");
const app = express();
const PORT = process.env.PORT;
const db = require("./models");
const cookieparser = require("cookie-parser");

app.use(cookieparser());

// // s3에 필요한 모듈
// const aws = require("aws-sdk");
// const multerS3 = require("multer-s3");
// const multer = require("multer");
// // aws s3 인스턴스 생성
// const s3 = new aws.S3();

// // aws 설정
// aws.config.update({
//   accessKeyId: process.env.AWS_S3_KEY_ID,
//   secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
//   region: process.env.AWS_S3_REGION,
// });

// //multer 설정 - aws s3
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_S3_BUCKET,
//     acl: "public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     metadata: function (req, file, cb) {
//       cb(null, { fileName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + "-" + file.originalname);
//     },
//   }),
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // HTTPS에서만 작동하도록 하려면 true로 변경
      maxAge: 60 * 60 * 1000, // 1시간
    },
  })
);

const indexRouter = require("./routes/index");
const userRouter = require("./routes/User");
const logRouter = require("./routes/FoodLog");
const groRouter = require("./routes/Grocery");
const postRouter = require("./routes/Posting");
const RecipeRouter = require("./routes/Recipe");

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/foodlog", logRouter);
app.use("/grocery", groRouter);
app.use("/posting", postRouter);
app.use("/Recipe", RecipeRouter);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    try {
      console.log(`http://localhost:${PORT}`);
    } catch (error) {
      console.error(error);
    }
  });
});
