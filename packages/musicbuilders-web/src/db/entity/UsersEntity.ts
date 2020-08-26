import {AfterLoad, Column, Entity, PrimaryColumn} from "typeorm";

@Entity("users")
export class UsersEntity {
  @PrimaryColumn({
    type: "varchar",
    name: "user_id",
    unique: true,
    nullable: false
  })
  public userId!: string;

  @Column({
    type: "varchar",
    name: "user_name",
    unique: false,
    nullable: false
  })
  public userName!: string;

  @Column({
    type: "varchar",
    name: "user_mail",
    unique: true,
    nullable: false
  })
  public userMail!: string;

  @Column({
    type: "varchar",
    name: "user_password",
    unique: false,
    nullable: false
  })
  public userPassword!: string;

  @Column({
    type: "date",
    name: "created_at",
    unique: false,
    nullable: false
  })
  public createdAt!: Date;

  @Column({
    type: "date",
    name: "updated_at",
    unique: false,
    nullable: false
  })
  public updatedAt!: Date;

  /**
   * TypeORMの仕様でDate型は文字列で保持されている。
   * それをDate型に変換する。
   */
  @AfterLoad()
  public convert(): void {
    this.createdAt = new Date(this.createdAt);
    this.updatedAt = new Date(this.updatedAt);
  }
}
