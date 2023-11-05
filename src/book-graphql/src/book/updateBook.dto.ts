import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBookDto{
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string
}