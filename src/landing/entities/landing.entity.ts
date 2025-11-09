import { Service } from 'src/service/entitites/service.entity';
import { Testimony } from 'src/testimony/entities/testimony.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Landing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    logoUrl: string;

    @Column()
    title: string;

    @Column()
    description: string;

    //Relaciones:

    //Servicios:
    @OneToMany(() => Service, (service) => service.landing, { cascade: true })
    services: Service[];

    //Testimonios:
    @OneToMany(() => Testimony, (testimony) => testimony.landing, { cascade: true })
    testimonies: Testimony[];
    
}