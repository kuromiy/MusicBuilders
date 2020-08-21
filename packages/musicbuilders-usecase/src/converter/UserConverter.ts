import { User } from "musicbuilders-domain/src/user/User";
import { UserDto } from "../dto/user/UserDto";

export class UserConverter {
  public static convert(user: User): UserDto {
    const userDto: UserDto = new UserDto(user.userId, user.userName, user.userMail, user.userPassword, user.createdAt, user.updatedAt);
    return userDto;
  }
}