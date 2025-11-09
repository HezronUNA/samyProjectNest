import { Landing } from 'src/landing/entities/landing.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Testimony {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  clientAvatar: string;

  @Column()
  rating: string;
  //Relacion:
  @ManyToOne(() => Landing, (landing) => landing.testimonies, {
    eager: true,
  })
  landing: Landing;
}