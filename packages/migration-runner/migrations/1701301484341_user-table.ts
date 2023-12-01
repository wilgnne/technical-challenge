/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("user", {
    user_id: { type: "integer", primaryKey: true },
    name: { type: "varchar(45)", notNull: true }
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("user");
}
