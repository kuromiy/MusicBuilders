import Express from "express";
import { wrap } from "../../utils/wrap";
import { LoginIndexRequest } from "musicbuilders-port/src/request/LoginIndexRequest";
import { container } from "../../container";
import { LoginController } from "musicbuilders-port/src/controller/LoginController";
import { LoginIndexResponse } from "musicbuilders-port/src/response/LoginIndexResponse";
import { LoginLoginRequest } from "musicbuilders-port/src/request/LoginLoginRequest";
import { LoginLoginResponse } from "musicbuilders-port/src/response/LoginLoginResponse";
import { LoginViewModel } from "../../viewmodel/LoginViewModel";
import { RequestErrorViewModel } from "../../viewmodel/error/RequestErrorViewModel";
import { LoginPresenter } from "../../presenter/LoginPresenter";

const router: Express.Router = Express.Router();

router.get("/login", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: LoginIndexRequest = new LoginIndexRequest();
  const controller: LoginController = container.get<LoginController>(LoginController);
  const response: LoginIndexResponse = await controller.index(request);
  return res.render("login", {model: new LoginViewModel("", new Array<RequestErrorViewModel>(), null)});
}));

router.post("/login", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: LoginLoginRequest = new LoginLoginRequest(req.body.usermail, req.body.userpassword);
  const controller: LoginController = container.get<LoginController>(LoginController);
  const response: LoginLoginResponse = await controller.login(request);
  const viewModel: LoginViewModel = LoginPresenter.present(response);

  // TODO 自然にコーディング出来ないかを考える。
  if (response.hasRequestError() || response.hasUseCaseError()) return res.render(viewModel.viewName, {model: viewModel});
  if (req.session) req.session.userid = response.userId;
  return res.redirect("/music-builders/" + viewModel.viewName);
}));

router.post("/logout", wrap(async (req: Express.Request, res: Express.Response) => {
  if (req.session) req.session.destroy((err: any) => console.log(err));
  return res.redirect("/music-builders/login");
}));

export default router;