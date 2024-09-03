import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("oauth_access_tokens")
export class OAuthAccessToken {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: number;

  @Column()
  name: string;


  @Column()
  revoked: boolean;
}
