import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Folder } from "./Folder";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Folder, (folder) => folder.user, {
    cascade: true,
  })
  folders: Folder[];
}
