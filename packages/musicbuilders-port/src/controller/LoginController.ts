import { injectable, inject } from "inversify";
import { LoginIndexRequest } from "../request/LoginIndexRequest";
import { LoginLoginRequest } from "../request/LoginLoginRequest";
import { LoginIndexResponse } from "../response/LoginIndexResponse";
import { LoginLoginResponse } from "../response/LoginLoginResponse";
import { LoginLoginService } from "../service/LoginLoginService";

/**
 * ログイン画面コントローラー
 */
@injectable()
export class LoginController {
  private _loginLoginService: LoginLoginService;

  constructor(@inject(LoginLoginService) loginLoginService: LoginLoginService) {
    this._loginLoginService = loginLoginService;
  }
  /**
   * 初期処理
   * @param request ログイン画面初期処理リクエスト
   * @returns ログイン画面初期処理レスポンス
   */
  public async index(request: LoginIndexRequest): Promise<LoginIndexResponse> {
    return new LoginIndexResponse();
  }

  /**
   * ログイン処理
   * @param request ログイン画面ログイン処理リクエスト
   * @returns ログイン画面ログイン処理レスポンス
   */
  public async login(request: LoginLoginRequest): Promise<LoginLoginResponse> {
    return this._loginLoginService.execute(request);
  }
}