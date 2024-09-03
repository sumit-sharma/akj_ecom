import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("astrologers")
export class Astrologer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  experience: string;


  @Column()
  about: string;
}
