import { Field, Float, ObjectType } from '@nestjs/graphql'
import { Location as LocationType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Location implements RestrictProperties<Location, LocationType> {
  id: number
  @Field(() => Float)
  latitude: number
  @Field(() => Float)
  longitude: number
  address: string
  createdAt: Date
  updatedAt: Date
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
