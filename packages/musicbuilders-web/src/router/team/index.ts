import Express from "express";
import { wrap } from "../../utils/wrap";
import { TeamRegisterController } from "musicbuilders-port/src/controller/TeamRegisterController";
import { TeamRegisterIndexRequest } from "musicbuilders-port/src/request/TeamRegisterIndexRequest";
import { TeamRegisterIndexResponse } from "musicbuilders-port/src/response/TeamRegisterIndexResponse";
import { container } from "../../container";
import { TeamRegisterViewModel } from "../../viewmodel/TeamRegisterViewModel";
import { RequestErrorViewModel } from "../../viewmodel/error/RequestErrorViewModel";
import { TeamRegisterCreateRequest } from "musicbuilders-port/src/request/TeamRegisterCreateRequest";
import { TeamRegisterCreateResponse } from "musicbuilders-port/src/response/TeamRegisterCreateResponse";
import { TeamRegisterPresenter } from "../../presenter/TeamRegisterPresenter";
import ProjectRouter from "../project";

const router: Express.Router = Express.Router();

router.get("/register", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: TeamRegisterIndexRequest = new TeamRegisterIndexRequest();
  const controller: TeamRegisterController = container.get<TeamRegisterController>(TeamRegisterController);
  const response: TeamRegisterIndexResponse = await controller.index(request);
  return res.render("team/register", {model: new TeamRegisterViewModel("", new Array<RequestErrorViewModel>(), null)});
}));

router.post("/register", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: TeamRegisterCreateRequest = new TeamRegisterCreateRequest(req.body.teamname, req.body.teamdescription, req.session?.userid);
  const controller: TeamRegisterController = container.get<TeamRegisterController>(TeamRegisterController);
  const response: TeamRegisterCreateResponse = await controller.create(request);
  const viewmModel: TeamRegisterViewModel = TeamRegisterPresenter.present(response);
  return res.render(viewmModel.viewName, {model: viewmModel});
}));

router.use(ProjectRouter);

export default router;
