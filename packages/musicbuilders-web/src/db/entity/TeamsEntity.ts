import {AfterLoad, Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import { UsersEntity } from "./UsersEntity";

@Entity("teams")
export class TeamsEntity {
  @PrimaryColumn({
    type: "varchar",
    name: "team_id",
    unique: true,
    nullable: false
  })
  public teamId!: string;

  @Column({
    type: "varchar",
    name: "team_name",
    unique: false,
    nullable: false
  })
  public teamName!: string;

  @Column({
    type: "varchar",
    name: "team_description",
    unique: false,
    nullable: true
  })
  public teamDescription!: string;

  @OneToOne(type => UsersEntity, {
    nullable: false
  })
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "userId"
  })
  public teamAdministrator!: UsersEntity;

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
