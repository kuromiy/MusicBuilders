import Express from "express";
import { UserRegisterController } from "musicbuilders-port/src/controller/UserRegisterController";
import { UserRegisterCreateRequest } from "musicbuilders-port/src/request/UserRegisterCreateRequest";
import { UserRegisterIndexRequest } from "musicbuilders-port/src/request/UserRegisterIndexRequest";
import { UserRegisterCreateResponse } from "musicbuilders-port/src/response/UserRegisterCreateResponse";
import { UserRegisterIndexResponse } from "musicbuilders-port/src/response/UserRegisterIndexResponse";
import { container } from "../../container";
import { UserRegisterPresenter } from "../../presenter/UserRegisterPresenter";
import { wrap } from "../../utils/wrap";
import { UserRegisterViewModel } from "../../viewmodel/UserRegisterViewModel";

const router: Express.Router = Express.Router();

router.get("/register", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: UserRegisterIndexRequest = new UserRegisterIndexRequest();
  const controller: UserRegisterController = container.get<UserRegisterController>(UserRegisterController);
  const response: UserRegisterIndexResponse = await controller.index(request);
  return res.render("user/register", {model: "test"});
}));

router.post("/register", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: UserRegisterCreateRequest = new UserRegisterCreateRequest(req.body.username, req.body.usermail, req.body.userpassword);
  const controller: UserRegisterController = container.get<UserRegisterController>(UserRegisterController);
  const response: UserRegisterCreateResponse = await controller.create(request);
  const viewModel: UserRegisterViewModel = UserRegisterPresenter.present(response);
  return res.render(viewModel.viewName, {model: viewModel.model});
}));

export default router;