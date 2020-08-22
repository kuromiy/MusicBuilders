import { inject, injectable } from "inversify";
import { UserRegisterCreateRequest } from "../request/UserRegisterCreateRequest";
import { UserRegisterIndexRequest } from "../request/UserRegisterIndexRequest";
import { UserRegisterCreateResponse } from "../response/UserRegisterCreateResponse";
import { UserRegisterIndexResponse } from "../response/UserRegisterIndexResponse";
import { UserRegisterCreateService } from "../service/UserRegisterCreateService";

/**
 * ユーザー登録画面コントローラー
 */
@injectable()
export class UserRegisterController {
  private _userRegisterCreateService: UserRegisterCreateService;

  constructor(@inject(UserRegisterCreateService) userRegisterCreateService: UserRegisterCreateService) {
    this._userRegisterCreateService = userRegisterCreateService;
  }

  /**
   * 初期処理
   * @param request ユーザー登録画面初期処理リクエスト
   * @returns ユーザー登録画面初期処理レスポンス
   */
  public async index(request: UserRegisterIndexRequest): Promise<UserRegisterIndexResponse> {
    return new UserRegisterIndexResponse();
  }

  /**
   * ユーザー登録処理
   * @param request ユーザー登録画面ユーザー登録処理リクエスト
   * @returns ユーザー登録画面ユーザー登録処理レスポンス
   */
  public async create(request: UserRegisterCreateRequest): Promise<UserRegisterCreateResponse> {
    return await this._userRegisterCreateService.execute(request);
  }
}