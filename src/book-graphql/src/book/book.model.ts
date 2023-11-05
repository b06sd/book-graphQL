import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity('books')
export class Book {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ name: 'name', length: 70, nullable: false })
    name: string;

    @Field()
    @Column({ name: 'description', length: 180, nullable: false })
    description: string;
}