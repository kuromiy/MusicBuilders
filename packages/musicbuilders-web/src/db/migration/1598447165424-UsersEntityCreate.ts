import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersEntityCreate1598447165424 implements MigrationInterface {
    name = 'UsersEntityCreate1598447165424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."users" ("user_id" character varying NOT NULL, "user_name" character varying NOT NULL, "user_mail" character varying NOT NULL, "user_password" character varying NOT NULL, "created_at" date NOT NULL, "updated_at" date NOT NULL, CONSTRAINT "UQ_77dbd8f00d5144dec590c0ddfa5" UNIQUE ("user_mail"), CONSTRAINT "PK_f49901459f096082f5835adddfd" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."users"`);
    }

}
