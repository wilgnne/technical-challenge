import { User } from "@technical-challenge/domain";
import { ClientBase } from "pg";

class UserRepository {
  constructor(private readonly client: ClientBase) {}

  async existById(userId: number): Promise<boolean> {
    const result = await this.client.query<{ exists: true }>(
      "SELECT EXISTS (SELECT 1 FROM public.user WHERE public.user.user_id = $1)",
      [userId],
    );

    return result.rows[0]?.exists ?? false;
  }

  async insert(user: User): Promise<void> {
    await this.client.query(
      "INSERT INTO public.user (user_id, name) VALUES ($1, $2)",
      [user.user_id, user.name],
    );
  }
}

export default UserRepository;
