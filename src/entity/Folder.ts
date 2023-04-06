import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Link } from "./Link";
import { User } from "./User";

@Entity()
export class Folder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.folders)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Link, (link) => link.folder, {
    cascade: true,
  })
  links: Link[];
}
