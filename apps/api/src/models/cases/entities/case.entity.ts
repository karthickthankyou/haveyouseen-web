import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { $Enums, Case as CaseType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType($Enums.Status, {
  name: 'Status',
  description: 'Enum for Status',
})

@ObjectType()
export class Case implements RestrictProperties<Case, CaseType> {
  id: number
  createdAt: Date
  updatedAt: Date
  missingPersonId: number
  @Field(() => $Enums.Status)
  status: $Enums.Status
  contact: string[]
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
