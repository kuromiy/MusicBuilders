import Express from "express";
import { wrap } from "../../utils/wrap";
import { HomeIndexRequest } from "musicbuilders-port/src/request/HomeIndexRequest";
import { HomeController } from "musicbuilders-port/src/controller/HomeController";
import { HomeIndexResponse } from "musicbuilders-port/src/response/HomeIndexResponse";
import { container } from "../../container";
import { HomeViewModel } from "../../viewmodel/HomeViewModel";
import { TeamViewDto } from "../../viewmodel/dto/TeamViewDto";
import { RequestErrorViewModel } from "../../viewmodel/error/RequestErrorViewModel";
import { HomePresenter } from "../../presenter/HomePresenter";

const router: Express.Router = Express.Router();

router.get("/", wrap(async (req: Express.Request, res: Express.Response) => {
  const request: HomeIndexRequest = new HomeIndexRequest(req.session?.userid);
  const controller: HomeController = container.get<HomeController>(HomeController);
  const response: HomeIndexResponse = await controller.index(request);
  const viewModel: HomeViewModel = HomePresenter.present(response);
  return res.render(viewModel.viewName, {model: viewModel});
}));

export default router;