export class UserDto {
  private _userId: string;
  private _userName: string;
  private _userMail: string;
  private _userPassword: string;
  private _createdAt: Date;
  private _updatedAt: Date;

	constructor(userId: string, userName: string, userMail: string, userPassword: string, createdAt: Date, updatedAt: Date) {
		this._userId = userId;
		this._userName = userName;
		this._userMail = userMail;
		this._userPassword = userPassword;
		this._createdAt = createdAt;
		this._updatedAt = updatedAt;
  }

	public get userId(): string {
		return this._userId;
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

	public get createdAt(): Date {
		return this._createdAt;
	}

	public get updatedAt(): Date {
		return this._updatedAt;
	}
}