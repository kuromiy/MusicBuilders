import Express from "express";
import { wrap } from "../../utils/wrap";
import { ProjectRegisterIndexRequest } from "musicbuilders-port/src/request/ProjectRegisterIndexRequest";
import { container } from "../../container";
import { ProjectRegisterController } from "musicbuilders-port/src/controller/ProjectRegisterController";
import { ProjectRegisterIndexResponse } from "musicbuilders-port/src/response/ProjectRegisterIndexResponse";
import { ProjectRegisterCreateRequest } from "musicbuilders-port/src/request/ProjectRegisterCreateRequest";
import { ProjectRegisterCreateResponse } from "musicbuilders-port/src/response/ProjectRegisterCreateResponse";
import { ProjectRegisterViewModel } from "../../viewmodel/ProjectRegisterViewModel";
import { ProjectRegisterPresenter } from "../../presenter/ProjectRegisterPresenter";
import { RequestErrorViewModel } from "../../viewmodel/error/RequestErrorViewModel";

const router: Express.Router = Express.Router();

router.get("/:teamid/project/register", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: ProjectRegisterIndexRequest = new ProjectRegisterIndexRequest();
  const controller: ProjectRegisterController = container.get<ProjectRegisterController>(ProjectRegisterController);
  const response: ProjectRegisterIndexResponse = await controller.index(request);
  const viewModel: ProjectRegisterViewModel = new ProjectRegisterViewModel("", req.params.teamid, new Array<RequestErrorViewModel>(), null);
  console.log(req.params);
  return res.render("project/register", {model: viewModel});
}));

router.post("/:teamid/project/register", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: ProjectRegisterCreateRequest = new ProjectRegisterCreateRequest(req.body.projectname, req.body.projectdescription, req.session?.userid, req.params.teamid);
  const controller: ProjectRegisterController = container.get<ProjectRegisterController>(ProjectRegisterController);
  const response: ProjectRegisterCreateResponse = await controller.create(request);
  const viewModel: ProjectRegisterViewModel = ProjectRegisterPresenter.present(response);
  return res.render(viewModel.viewName, {model: viewModel});
}));

export default router;