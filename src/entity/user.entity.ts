import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  token: string;

  @Column()
  provider: string;
}
