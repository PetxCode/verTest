const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(
  "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"
);

const app = express();
const port = 2335;
const imageData = multer();

app.use(express.json());

cloudinary.config({
  cloud_name: "dv4dlmp4e",
  api_key: "464513458841612",
  api_secret: "VxFfeGaNMPPudxcq0GWcsh6zfRk",
});

const msg = {
  to: "d1churchnetwork@gmail.com", // Change to your recipient
  from: "newstudentsportal2@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

app.get("/message", (req, res) => {
  sendgrid
    .send(msg)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("This is Error: ", error);
    });

  return res.status(200).json({ message: "Message has been sent..." });
});

app.post("/upload", imageData.single("image"), function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req?.file.buffer).pipe(stream);
    });
  };

  const upload = async (req) => {
    const result = await streamUpload(req);
    res.json({ message: "uploaded", data: result?.secure_url });
  };

  upload(req);
});

app.listen(port, () => {
  console.log("");
  console.log("starting server!!!");
  console.log("");
});
