import { injectable } from "inversify";
import { User } from "musicbuilders-domain/src/user/User";
import { UserId } from "musicbuilders-domain/src/user/UserId";
import { UserMail } from "musicbuilders-domain/src/user/UserMail";
import { UserName } from "musicbuilders-domain/src/user/UserName";
import { UserPassword } from "musicbuilders-domain/src/user/UserPassword";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";
import { getRepository } from "typeorm";
import { UsersEntity } from "../db/entity/UsersEntity";
import { v4 } from "uuid";

/**
 * ユーザーデータソース
 */
@injectable()
export class UserDatasource implements UserRepository {
  public async register(user: User): Promise<number> {
    const usersEntity: UsersEntity = new UsersEntity();
    usersEntity.userId = user.userId;
    usersEntity.userName = user.userName;
    usersEntity.userMail = user.userMail;
    usersEntity.userPassword = user.userPassword;
    usersEntity.createdAt = user.createdAt;
    usersEntity.updatedAt = user.updatedAt;

    const registeredUsersEntity: UsersEntity = await getRepository(UsersEntity).save(usersEntity);
    if (registeredUsersEntity) {
      return 1;
    } else {
      return 0;
    }
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

  public async findByUserMail(userMail: UserMail): Promise<User | null> {
    const usersEntity: UsersEntity | undefined = await getRepository(UsersEntity).findOne({userMail: userMail.value});
    if (usersEntity) {
      const userId: UserId = new UserId(usersEntity.userId);
      const userName: UserName = new UserName(usersEntity.userName);
      const userMail: UserMail = new UserMail(usersEntity.userMail);
      const userPassword: UserPassword = new UserPassword(usersEntity.userPassword);
      const fintUser: User = User.recreate(userId, userName, userMail, userPassword, usersEntity.createdAt, usersEntity.updatedAt);
      return fintUser;
    } else {
      return null;
    }
  }

  public async generateUserId(): Promise<UserId> {
    const id: string = v4();
    // TODO uuidで生成したIDがDBに登録されていないかの判定実装
    return new UserId(id);
  }
}