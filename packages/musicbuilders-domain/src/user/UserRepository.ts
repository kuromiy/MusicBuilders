import { User } from "./User";
import { UserId } from "./UserId";
import { UserMail } from "./UserMail";

/**
 * ユーザーリポジトリ
 */
export interface UserRepository {
  /**
   * ユーザーを登録する。
   * @param user ユーザー
   * @returns 処理結果 1: 成功 0: 失敗
   */
  register(user: User): Promise<number>;

  /**
   * ユーザーを更新する。
   * @param user ユーザー
   * @returns 処理結果 1: 成功 0: 失敗
   */
  update(user: User): Promise<number>;

  /**
   * ユーザーIDを条件にユーザーを削除する。
   * @param userId ユーザーID
   * @returns 処理結果 1: 成功 0: 失敗
   */
  logicalDelete(userId: UserId): Promise<number>;

  /**
   * ユーザーIDを条件にユーザーを取得する。
   * @param userId ユーザーID
   * @returns 取得結果
   */
  findByUserId(userId: UserId): Promise<User | null>;

  /**
   * ユーザーメールを条件にユーザーを取得する。
   * @param userMail ユーザーメール
   * @returns 取得結果
   */
  findByUserMail(userMail: UserMail): Promise<User | null>;

  /**
   * ユーザーIDを生成する。
   * @returns ユーザーID
   */
  generateUserId(): Promise<UserId>;
}