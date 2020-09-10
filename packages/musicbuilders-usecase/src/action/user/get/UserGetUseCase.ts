import { UseCaseError } from "../../../error/UseCaseError";
import { Result } from "../../../utils/Result";
import { UserGetInput } from "./UserGetInput";
import { UserGetOuptut } from "./UserGetOutput";

/**
 * ユーザー取得ユースケース
 */
export interface UserGetUseCase {
  /**
   * ユーザー取得入力情報を元にユーザーを取得する。
   * @param input ユーザー取得入力情報
   * @returns ユーザー取得出力情報
   */
  handle(input: UserGetInput): Promise<Result<UserGetOuptut, UseCaseError>>;
}