import {MigrationInterface, QueryRunner} from "typeorm";

export class ProjectsEntityCreate1600657483227 implements MigrationInterface {
    name = 'ProjectsEntityCreate1600657483227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."projects" ("project_id" character varying NOT NULL, "project_name" character varying NOT NULL, "project_description" character varying, "created_at" date NOT NULL, "updated_at" date NOT NULL, "user_id" character varying NOT NULL, "team_id" character varying NOT NULL, CONSTRAINT "REL_a2ca57983d1a8edaddfdb7c747" UNIQUE ("user_id"), CONSTRAINT "REL_9bbf906681925adfc1d457ac8b" UNIQUE ("team_id"), CONSTRAINT "PK_0b6a9050e38cc46ed63e5a22653" PRIMARY KEY ("project_id"))`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD CONSTRAINT "FK_a2ca57983d1a8edaddfdb7c7475" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD CONSTRAINT "FK_9bbf906681925adfc1d457ac8bf" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP CONSTRAINT "FK_9bbf906681925adfc1d457ac8bf"`);
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP CONSTRAINT "FK_a2ca57983d1a8edaddfdb7c7475"`);
        await queryRunner.query(`DROP TABLE "public"."projects"`);
    }

}
