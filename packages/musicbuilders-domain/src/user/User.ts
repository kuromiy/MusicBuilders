import { UserId } from "./UserId";
import { UserMail } from "./UserMail";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

/**
 * ユーザー
 */
export class User {
  private _userId: UserId;
  private _userName: UserName;
  private _userMail: UserMail;
  private _userPassword: UserPassword;
  private _createdAt: Date;
  private _updatedAt: Date;

	private constructor(userId: UserId, userName: UserName, userMail: UserMail, userPassword: UserPassword, createdAt: Date, updatedAt: Date) {
		this._userId = userId;
		this._userName = userName;
		this._userMail = userMail;
		this._userPassword = userPassword;
		this._createdAt = createdAt;
		this._updatedAt = updatedAt;
	}

  public static create(userId: UserId, userName: UserName, userMail: UserMail, userPassword: UserPassword): User {
    const now: Date = new Date();
    return new User(userId, userName, userMail, userPassword, now, now);
  }

  public static recreate(userId: UserId, userName: UserName, userMail: UserMail, userPassword: UserPassword, createdAt: Date, updatedAt: Date): User {
    return new User(userId, userName, userMail, userPassword, createdAt, updatedAt);
  }

  public get userId(): string {
    return this._userId.value;
  }

  public get userName(): string {
    return this._userName.value;
  }

  public get userMail(): string {
    return this._userMail.value;
  }

  public get userPassword(): string {
    return this._userPassword.value;
  }

	public get createdAt(): Date {
		return this._createdAt;
	}

	public get updatedAt(): Date {
		return this._updatedAt;
	}

}