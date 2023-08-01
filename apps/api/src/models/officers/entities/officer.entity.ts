import { Field, ObjectType } from '@nestjs/graphql'
import { Officer as OfficerType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Officer implements RestrictProperties<Officer, OfficerType> {
  createdAt: Date
  updatedAt: Date
  uid: string
  @Field({ nullable: true })
  name: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
