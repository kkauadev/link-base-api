import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Folder } from "./FolderEntity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  // @Column({ nullable: false, unique: true })
  // username: string;

  // @Column({ nullable: false, unique: true })
  // email: string;

  // @Column({ nullable: true })
  // bio: string;

  @OneToMany(() => Folder, (folder) => folder.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  folders: Folder[];

  @CreateDateColumn({ type: "timestamp" })
  createDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedDate: Date;
}
