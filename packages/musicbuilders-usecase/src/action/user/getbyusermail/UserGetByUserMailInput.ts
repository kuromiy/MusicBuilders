export class UserGetByUserMailInput {
  private _userMail: string;

	constructor(userMail: string) {
		this._userMail = userMail;
	}

  public get userMail(): string {
		return this._userMail;
	}
}