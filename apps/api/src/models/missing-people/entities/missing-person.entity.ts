import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { $Enums, MissingPerson as MissingPersonType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType($Enums.Gender, {
  name: 'Gender',
  description: 'Enum for Gender',
})

registerEnumType($Enums.BodyType, {
  name: 'BodyType',
  description: 'Enum for BodyType',
})

@ObjectType()
export class MissingPerson
  implements RestrictProperties<MissingPerson, MissingPersonType>
{
  id: number
  createdAt: Date
  updatedAt: Date
  displayName: string
  images: string[]
  @Field({ nullable: true })
  dob: Date
  @Field(() => $Enums.Gender)
  gender: $Enums.Gender
  description: string
  @Field({ nullable: true })
  missingSince: Date
  @Field({ nullable: true })
  height: number
  @Field({ nullable: true })
  weight: number
  @Field(() => $Enums.BodyType, { nullable: true })
  bodyType: $Enums.BodyType
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
