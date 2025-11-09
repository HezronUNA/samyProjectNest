import { Landing } from 'src/landing/entities/landing.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  imagenUrl: string;

  //Relacion con Landing:
  @ManyToOne(() => Landing, (landing) => landing.services, {
    eager: true,
  })
  landing: Landing;
}