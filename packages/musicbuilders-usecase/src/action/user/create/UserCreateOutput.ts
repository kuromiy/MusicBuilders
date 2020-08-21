import { UserDto } from "../../../dto/user/UserDto";

/**
 * ユーザー作成出力情報クラス
 */
export class UserCreateOutput {
  private _userDto: UserDto;

	constructor(userDto: UserDto) {
		this._userDto = userDto;
	}

	public get userDto(): UserDto {
		return this._userDto;
	}
}