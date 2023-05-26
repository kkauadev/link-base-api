import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Relation,
} from "typeorm";
import { Folder } from "./FolderEntity";

@Entity()
export class Link {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @ManyToOne(() => Folder, (folder) => folder.links, { onDelete: "CASCADE" })
  @JoinColumn({ name: "folder_id" })
  folder: Relation<Folder>;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
