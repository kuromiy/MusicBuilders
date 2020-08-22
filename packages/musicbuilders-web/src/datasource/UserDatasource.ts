import { injectable } from "inversify";
import { User } from "musicbuilders-domain/src/user/User";
import { UserId } from "musicbuilders-domain/src/user/UserId";
import { UserMail } from "musicbuilders-domain/src/user/UserMail";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";

/**
 * ユーザーデータソース
 */
@injectable()
export class UserDatasource implements UserRepository {
  register(user: User): Promise<number> {
    throw new Error("Method not implemented.");
  }
  update(user: User): Promise<number> {
    throw new Error("Method not implemented.");
  }
  logicalDelete(userId: UserId): Promise<number> {
    throw new Error("Method not implemented.");
  }
  findByUserId(userId: UserId): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findByUserMail(userMail: UserMail): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  generateUserId(): Promise<UserId> {
    throw new Error("Method not implemented.");
  }

}