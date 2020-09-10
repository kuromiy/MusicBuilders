import { inject, injectable } from "inversify";
import { User } from "musicbuilders-domain/src/user/User";
import { UserId } from "musicbuilders-domain/src/user/UserId";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";
import { UserConverter } from "../../../converter/UserConverter";
import { UserDto } from "../../../dto/user/UserDto";
import { UseCaseError } from "../../../error/UseCaseError";
import { Failure } from "../../../utils/Failure";
import { Result } from "../../../utils/Result";
import { Success } from "../../../utils/Success";
import { UserGetInput } from "./UserGetInput";
import { UserGetOuptut } from "./UserGetOutput";
import { UserGetUseCase } from "./UserGetUseCase";

/**
 * ユーザー取得ユースケース実装クラス
 */
@injectable()
export class UserGetAction implements UserGetUseCase {
  private _userRepository: UserRepository;

  constructor(@inject("UserRepository") userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(input: UserGetInput): Promise<Result<UserGetOuptut, UseCaseError>> {
    const userId: UserId = new UserId(input.userId);

    // 1. ユーザー取得
    const foundUser: User | null = await this._userRepository.findByUserId(userId);
    if (!foundUser) return new Failure(UseCaseError.USE002);

    const userDto: UserDto = UserConverter.convert(foundUser);
    const output: UserGetOuptut = new UserGetOuptut(userDto);
    return new Success(output);
  }
}