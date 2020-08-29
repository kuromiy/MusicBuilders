import { IsEmail, IsString, Length } from "class-validator";

/**
 * ログイン画面ログイン処理リクエスト
 */
export class LoginLoginRequest {
  @IsString({
    message: "ユーザー名は文字列です。"
  })
  @IsEmail({}, {
    message: "メールアドレス形式です。"
  })
  private _userMail: string;

  @IsString({
    message: "パスワードは文字列です。"
  })
  @Length(8, 16, {
    message: "パスワードは8字以上16字以下です。"
  })
  private _userPassword: string;

	constructor(userMail: string, userPassword: string) {
		this._userMail = userMail;
		this._userPassword = userPassword;
	}

	public get userMail(): string {
		return this._userMail;
	}

	public get userPassword(): string {
		return this._userPassword;
	}
}