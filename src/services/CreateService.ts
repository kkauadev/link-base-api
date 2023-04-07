import { userRepository } from "../repositories";

export class CreateService {
  async user(data: string) {
    if (!data) {
      return new Error("there is missing data");
    }
    const newUser = userRepository().create({
      name: data,
    });
    await userRepository().save(newUser);
    return newUser;
  }
}
