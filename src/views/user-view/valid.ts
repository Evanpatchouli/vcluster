import { z } from "zod";

export const UserValidator = 
z.object({
  username: z.string().nonempty("username cannot be empty"),
  password: z.string().nonempty("password cannot be empty"),
})

export type UserForm = z.infer<typeof UserValidator>