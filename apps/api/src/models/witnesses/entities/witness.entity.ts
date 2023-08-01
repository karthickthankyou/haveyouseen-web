import { Field, ObjectType } from '@nestjs/graphql'
import { Witness as WitnessType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Witness implements RestrictProperties<Witness, WitnessType> {
  createdAt: Date
  updatedAt: Date
  @Field({ nullable: true })
  uid: string
  name: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
