"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
var express_1 = require("express");
var cloudinary_1 = require("cloudinary");
var multer_1 = require("multer");
var streamifier_1 = require("streamifier");
var mail_1 = require("@sendgrid/mail");
mail_1["default"].setApiKey(
  "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"
);

var app = (0, express_1["default"])();
var port = 2335;
var cloudinary = cloudinary_1["default"].v2;
var imageData = (0, multer_1["default"])();

app.use(express_1["default"].json());
cloudinary.config({
  cloud_name: "dv4dlmp4e",
  api_key: "464513458841612",
  api_secret: "VxFfeGaNMPPudxcq0GWcsh6zfRk",
});
var msg = {
  to: "d1churchnetwork@gmail.com",
  from: "newstudentsportal2@gmail.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
app.get("/message", function (req, res) {
  mail_1["default"]
    .send(msg)
    .then(function (response) {
      //   console.log(response[0].statusCode);
      //   console.log(response[0].headers);
      console.log(response);
    })
    ["catch"](function (error) {
      console.error("This is Error: ", error);
    });
  return res.status(200).json({ message: "Message has been sent..." });
});
app.post("/upload", imageData.single("image"), function (req, res, next) {
  var _this = this;
  var streamUpload = function (req) {
    return new Promise(function (resolve, reject) {
      var stream = cloudinary.uploader.upload_stream(function (error, result) {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier_1["default"]
        .createReadStream(
          req === null || req === void 0 ? void 0 : req.file.buffer
        )
        .pipe(stream);
    });
  };
  var upload = function (req) {
    return __awaiter(_this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, streamUpload(req)];
          case 1:
            result = _a.sent();
            res.json({
              message: "uploaded",
              data:
                result === null || result === void 0
                  ? void 0
                  : result.secure_url,
            });
            return [2 /*return*/];
        }
      });
    });
  };
  upload(req);
});
app.listen(port, function () {
  console.log("");
  console.log("starting server!!!");
  console.log("");
});
