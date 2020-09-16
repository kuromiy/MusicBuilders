import {MigrationInterface, QueryRunner} from "typeorm";

export class TeamsEntityCreate1600086496029 implements MigrationInterface {
    name = 'TeamsEntityCreate1600086496029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."teams" ("team_id" character varying NOT NULL, "team_name" character varying NOT NULL, "team_description" character varying, "created_at" date NOT NULL, "updated_at" date NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "REL_b8561d472f5ff17feef05dad87" UNIQUE ("user_id"), CONSTRAINT "PK_c38a20044ec9f778884dfcee091" PRIMARY KEY ("team_id"))`);
        await queryRunner.query(`ALTER TABLE "public"."teams" ADD CONSTRAINT "FK_b8561d472f5ff17feef05dad87b" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."teams" DROP CONSTRAINT "FK_b8561d472f5ff17feef05dad87b"`);
        await queryRunner.query(`DROP TABLE "public"."teams"`);
    }

}
