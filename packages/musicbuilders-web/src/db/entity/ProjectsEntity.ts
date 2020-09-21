import {AfterLoad, Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import { TeamsEntity } from "./TeamsEntity";
import { UsersEntity } from "./UsersEntity";

@Entity("projects")
export class ProjectsEntity {
  @PrimaryColumn({
    type: "varchar",
    name: "project_id",
    unique: true,
    nullable: false
  })
  public projectId!: string;

  @Column({
    type: "varchar",
    name: "project_name",
    unique: false,
    nullable: false
  })
  public projectName!: string;

  @Column({
    type: "varchar",
    name: "project_description",
    unique: false,
    nullable: true,
  })
  public projectDescription!: string;

  @OneToOne(type => UsersEntity, {
    nullable: false
  })
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "userId"
  })
  public projectAdministrator!: UsersEntity;

  @OneToOne(type => TeamsEntity, {
    nullable: false
  })
  @JoinColumn({
    name: "team_id",
    referencedColumnName: "teamId"
  })
  public team!: TeamsEntity;

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
