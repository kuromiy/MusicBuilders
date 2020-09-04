import { UseCaseError } from "../../../error/UseCaseError";
import { Result } from "../../../utils/Result";
import { UserCreateInput } from "./UserCreateInput";
import { UserCreateOutput } from "./UserCreateOutput";

/**
 * ユーザー作成ユースケース
 */
export interface UserCreateUseCase {
  /**
   * ユーザー作成入力情報を元にユーザーを作成する。
   * @param input ユーザー作成入力情報
   * @returns ユーザー作成出力情報
   */
  handle(input: UserCreateInput): Promise<Result<UserCreateOutput, UseCaseError>>;
}