import Express from "express";
import { wrap } from "../../utils/wrap";
import { LoginIndexRequest } from "musicbuilders-port/src/request/LoginIndexRequest";
import { container } from "../../container";
import { LoginController } from "musicbuilders-port/src/controller/LoginController";
import { LoginIndexResponse } from "musicbuilders-port/src/response/LoginIndexResponse";
import { LoginLoginRequest } from "musicbuilders-port/src/request/LoginLoginRequest";
import { LoginLoginResponse } from "musicbuilders-port/src/response/LoginLoginResponse";

const router: Express.Router = Express.Router();

router.get("/login", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: LoginIndexRequest = new LoginIndexRequest();
  const controller: LoginController = container.get<LoginController>(LoginController);
  const response: LoginIndexResponse = await controller.index(request);
  return res.render("login");
}));

router.post("/login", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: LoginLoginRequest = new LoginLoginRequest(req.body.usermail, req.body.userpassword);
  const controller: LoginController = container.get<LoginController>(LoginController);
  const response: LoginLoginResponse = await controller.login(request);

  // TODO エラーメッセージを表示実装する。
  if (response.hasError()) return res.render("login");

  if (req.session) req.session.userid = response.userId;
  return res.redirect("/music-builders");
}));

export default router;