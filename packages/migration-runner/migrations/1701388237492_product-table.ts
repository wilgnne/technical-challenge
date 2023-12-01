/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("product", {
    product_id: { type: "integer", notNull: true },
    order_id: {
      type: "integer",
      references: "order",
      referencesConstraintName: "fk_product_order",
      notNull: true
    },
    value: { type: "money", notNull: true }
  });

  pgm.createConstraint('product', "pk_product_order", {
    primaryKey: ["product_id", "order_id"]
  });

  pgm.createIndex("product", ["product_id", "order_id"], { unique: true })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropIndex("product", ["product_id", "order_id"], { unique: true });
  pgm.dropConstraint("product", "pk_product_order");
  pgm.dropTable("product");
}
