import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BookDto{
  @Field()
  name: string;

  @Field()
  description: string
}