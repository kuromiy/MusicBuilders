import { UserDto } from "../../../dto/user/UserDto";

/**
 * ユーザー取得出力情報クラス
 */
export class UserGetOuptut {
  private _userDto: UserDto;

	constructor(userDto: UserDto) {
		this._userDto = userDto;
	}

	public get userDto(): UserDto {
		return this._userDto;
	}
}