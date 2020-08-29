import { IsEmail, IsString, Length } from "class-validator";

/**
 * ユーザー登録画面ユーザー登録処理リクエスト
 */
export class UserRegisterCreateRequest {
  @IsString({
    message: "ユーザー名は文字列です。"
  })
  @Length(1, 30, {
    message: "ユーザー名は1字以上30字以下です。",
  })
  private _userName: string;

  @IsString({
    message: "メールアドレスは文字列です。",
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

	constructor(userName: string, userMail: string, userPassword: string) {
		this._userName = userName;
		this._userMail = userMail;
		this._userPassword = userPassword;
	}

	public get userName(): string {
		return this._userName;
	}

	public get userMail(): string {
		return this._userMail;
	}

	public get userPassword(): string {
		return this._userPassword;
	}
}