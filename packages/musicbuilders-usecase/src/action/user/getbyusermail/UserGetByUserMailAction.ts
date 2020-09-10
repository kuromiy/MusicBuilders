import { inject, injectable } from "inversify";
import { User } from "musicbuilders-domain/src/user/User";
import { UserMail } from "musicbuilders-domain/src/user/UserMail";
import { UserRepository } from "musicbuilders-domain/src/user/UserRepository";
import { UserConverter } from "../../../converter/UserConverter";
import { UserDto } from "../../../dto/user/UserDto";
import { UseCaseError } from "../../../error/UseCaseError";
import { Failure } from "../../../utils/Failure";
import { Result } from "../../../utils/Result";
import { Success } from "../../../utils/Success";
import { UserGetByUserMailInput } from "./UserGetByUserMailInput";
import { UserGetByUserMailOutput } from "./UserGetByUserMailOutput";
import { UserGetByUserMailUseCase } from "./UserGetByUserMailUseCase";

@injectable()
export class UserGetByUserMailAction implements UserGetByUserMailUseCase {
  private _userRepository: UserRepository;

  constructor(@inject("UserRepository") userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(input: UserGetByUserMailInput): Promise<Result<UserGetByUserMailOutput, UseCaseError>> {
    const userMail: UserMail = new UserMail(input.userMail);

    // 1. ユーザー取得
    const foundUser: User | null = await this._userRepository.findByUserMail(userMail);
    if (!foundUser) return new Failure(UseCaseError.USE002);

    const userDto: UserDto = UserConverter.convert(foundUser);
    const output: UserGetByUserMailOutput = new UserGetByUserMailOutput(userDto);
    return new Success(output);
  }
}