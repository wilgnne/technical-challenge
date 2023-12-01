/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("order", {
    order_id: { type: "integer", primaryKey: true },
    user_id: { type: "integer", notNull: true },
    date: { type: "date", notNull: true }
  });

  pgm.createConstraint(
    { name: "order" },
    "fk_order_user",
    {
      foreignKeys: {
        columns: "user_id",
        references: "public.user(user_id)"
      }
    }
  );

  pgm.createIndex("order", ["order_id", "user_id"], { unique: true })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropIndex("order", ["order_id", "user_id"], { unique: true });
  pgm.dropConstraint("order", "fk_order_user");
  pgm.dropTable("order");
}
