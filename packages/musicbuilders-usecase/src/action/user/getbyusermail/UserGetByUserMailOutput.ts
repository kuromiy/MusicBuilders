import { UserDto } from "../../../dto/user/UserDto";

export class UserGetByUserMailOutput {
  private _userDto: UserDto;

	constructor(userDto: UserDto) {
		this._userDto = userDto;
	}

	public get userDto(): UserDto {
		return this._userDto;
	}
}