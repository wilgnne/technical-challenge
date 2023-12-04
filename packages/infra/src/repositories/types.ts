export interface IRepository<T, PrimaryKeys extends keyof T> {
  existById(keys: Pick<T, PrimaryKeys>): Promise<boolean>;

  insert(entity: T): Promise<void>;
}
