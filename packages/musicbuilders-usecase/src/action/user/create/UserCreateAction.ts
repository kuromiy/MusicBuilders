import { UserCreateInput } from "./UserCreateInput";
import { UserCreateOutput } from "./UserCreateOutput";
import { UserCreateUseCase } from "./UserCreateUseCase";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";
import { UserName } from "musicbuilders-domain/src/user/UserName";
import { UserMail } from "musicbuilders-domain/src/user/UserMail";
import { UserPassword } from "musicbuilders-domain/src/user/UserPassword";
import { User } from "musicbuilders-domain/src/user/User";
import { UserId } from "musicbuilders-domain/src/user/UserId";
import { UserDto } from "../../../dto/user/UserDto";
import { UserConverter } from "../../../converter/UserConverter";
import { inject, injectable } from "inversify";

/**
 * ユーザー作成ユースケース実装クラス
 */
@injectable()
export class UserCreateAction implements UserCreateUseCase {
  private _userRepository: UserRepository;

  constructor(@inject("UserRepository") userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(input: UserCreateInput): Promise<UserCreateOutput> {
    const userName: UserName = new UserName(input.userName);
    const userMail: UserMail = new UserMail(input.userMail);
    const userPassword: UserPassword = new UserPassword(input.userPassword);

    // 1. 登録されているメールアドレス判定
    const existUser: User | null = await this._userRepository.findByUserMail(userMail);
    if (existUser) throw new Error("既に使われているメールアドレスです。");

    // 2. ユーザーID生成
    const userId: UserId = await this._userRepository.generateUserId();

    // 3. ユーザー作成・登録
    const registerableUser: User = User.create(userId, userName, userMail, userPassword);
    const result: number = await this._userRepository.register(registerableUser);
    if (result == 0) throw new Error("DB登録エラー");

    const userDto: UserDto = UserConverter.convert(registerableUser);
    const output: UserCreateOutput = new UserCreateOutput(userDto);
    return output;
  }
}