import { UseCaseError } from "../../../error/UseCaseError";
import { Result } from "../../../utils/Result";
import { UserGetByUserMailInput } from "./UserGetByUserMailInput";
import { UserGetByUserMailOutput } from "./UserGetByUserMailOutput";

export interface UserGetByUserMailUseCase {
  handle(input: UserGetByUserMailInput): Promise<Result<UserGetByUserMailOutput, UseCaseError>>;
}