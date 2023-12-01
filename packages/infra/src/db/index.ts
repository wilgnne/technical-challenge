import { Pool, PoolClient } from "pg";

import { pgConfig } from "../config/pg";

export class DbProvider {
  private static pool: Pool | null = null

  static getPool(): Pool {
    if (DbProvider.pool) return DbProvider.pool;

    DbProvider.pool = new Pool(pgConfig)

    return DbProvider.pool;
  }

  static getConnection(): Promise<PoolClient> {
    return this.getPool().connect()
  }
}
