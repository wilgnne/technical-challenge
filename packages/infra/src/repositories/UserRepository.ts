import { ClientBase } from "pg";

class UserRepository {
  constructor(readonly client: ClientBase) {}

  async userExistById(userId: number): Promise<boolean> {
    try {
      const result = await this.client.query<{ exists: true }>(
        "SELECT EXISTS (SELECT 1 FROM public.user WHERE public.user.user_id = $1)",
        [userId],
      );

      return result.rows[0]?.exists ?? false;
    } catch (error) {
      console.error("Erro ao verificar existência do usuário por ID:", error);
      throw error;
    }
  }
}

export default UserRepository;
