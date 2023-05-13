import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().nonempty().min(3).max(200),
  password: z.string().nonempty().min(3).max(200),
});

export const createFolderSchema = z.object({
  name: z.string().nonempty().min(3).max(200),
  description: z.string().nonempty().max(500),
});

const linkSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nonempty().min(4).max(200),
  description: z.string().nonempty().min(4).max(500),
  link: z.string().nonempty().min(4).max(200),
  folder_id: z.string().nonempty(),
  createDate: z.date(),
  updatedDate: z.date(),
});

const folderSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty().min(4).max(200),
  user_id: z.string().nonempty(),
  links: z.array(linkSchema),
  createDate: z.date(),
  updatedDate: z.date(),
});

const userSchema = z.object({
  id: z.string().uuid(),
  password: z.string().nonempty().min(4).max(200),
  name: z.string().nonempty().min(4).max(200),
  folders: z.array(folderSchema),
  createDate: z.date(),
  updatedDate: z.date(),
});
