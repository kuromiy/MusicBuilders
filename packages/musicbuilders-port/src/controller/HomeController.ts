import { inject, injectable } from "inversify";
import { HomeIndexRequest } from "../request/HomeIndexRequest";
import { HomeIndexResponse } from "../response/HomeIndexResponse";
import { HomeIndexService } from "../service/HomeIndexService";

@injectable()
export class HomeController {
  private _homeIndexService: HomeIndexService;

  constructor(@inject(HomeIndexService) homeIndexService: HomeIndexService) {
    this._homeIndexService = homeIndexService;
  }

  public async index(request: HomeIndexRequest): Promise<HomeIndexResponse> {
    return await this._homeIndexService.execute(request);
  }
}