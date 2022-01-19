// express server
const express = require("express");
const app = express();

// mongoose db
const mongoose = require("mongoose");

// our route
const userRoute = require("./routes/userRoute.js");
const blogsRoute = require("./routes/blogsRoute.js");
const commentsRoute = require("./routes/commentsRoute");
const multer = require("multer");
const fs = require("fs");

//gridfs-stream
//multer-gridfs-stream

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "video/mp4"
    ) {
      cb(null, "./images");
    } else {
      cb("we dont support any other format");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
// //////////////////////////////////////////////////////////////////////////

// dotenv store secret data
require("dotenv").config();

// convert any data to json
app.use(express.json());

// cors policy
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.urlencoded({ extended: true }));

let ImageBucket;

// create a port
const PORT = process.env.PORT || 4000;

// mongoose db connection
mongoose.connect("mongodb://127.0.0.1:27017/blogs-database", () => {
  console.log("connection established ..... with mongodb compass");
  // انشاء صوؤة ملف
  ImageBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "test-images",
  });
});

//
function imageStore(req, res, next) {
  console.log(req.url);
  // اذا كان هناك ملف في ريكويست 1
  if (req.file) {
    //  نقم بقراءة الصورة التي في الملف المرسل من المستخدم   2
    const readFile = fs.createReadStream(`./images/${req.file.filename}`);
    const writeStream = ImageBucket.openUploadStream(`${req.file.filename}`);
    //  3 ارسال الصور الى الداتابيز
    readFile.pipe(writeStream);

    //  4 creating image url   ننشئ لينك للصورة الموجودة في ريكوست بدي
    req.body.image = `http://localhost:3000/images/${req.file.filename}`;
    next();
  } else {
    next(err);
  }
}
// this is url image middleware هنا للحصول على الصورة
app.get("/images/:filename", (req, res, next) => {
  // console.log("====================================");
  // console.log(req.params.filename);
  // console.log("====================================");

  // download the image , transfer the image in response
  ImageBucket.openDownloadStreamByName(req.params.filename).pipe(res);
});
// upload images  store image in our image folder //////////////////////////////////
//  store the image to database ///imageStore
app.use("/", upload.single("image"), imageStore, userRoute);
//////////////////////////////////////////////////////////////
app.use("/blogs", upload.single("image"), imageStore, blogsRoute);
app.use("/comments", commentsRoute);

// not found html page
app.use((req, res, next) => {
  res.sendFile(__dirname + "/views/notfound.html");
});

// universal error handler middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ success: false, message: err.message });
});

// our PORT listening
app.listen(PORT, () => console.log(`server listening on ${PORT}`));
