import "reflect-metadata";

import Express from "express";
import BodyParser from "body-parser";
import ExpressSession from "express-session";
import router from "./router";

// Express設定
const app: Express.Express = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

// ViewEngine設定
app.set("view engine", "ejs");
app.set("views", "src/view");
const ejs = require("ejs").__express;
app.engine(".ejs", ejs);

// Session設定
app.use(ExpressSession({
  secret: "test",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 30
  }
}));

// Routing設定
app.use("/music-builders", router);

// Server開始
app.listen(3000, () => {
  console.log("STAT port: 3000");
});