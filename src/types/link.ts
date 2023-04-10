import { Optional } from ".";
import { Link } from "../entities/LinkEntity";

export type CreateLinkData = Optional<
  Omit<Link, "createDate" | "updatedDate" | "folder" | "id">
>;

export type UpdateLinkData = Optional<
  Omit<Link, "createDate" | "updatedDate" | "folder" | "id">
>;
