import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { $Enums, Report as ReportType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType($Enums.ReportType, {
  name: 'ReportType',
  description: 'Enum for ReportType',
})

@ObjectType()
export class Report implements RestrictProperties<Report, ReportType> {
  id: number
  createdAt: Date
  updatedAt: Date
  @Field({ nullable: true })
  time: Date
  description: string
  @Field({ nullable: true })
  locationId: number
  @Field(() => $Enums.ReportType)
  type: $Enums.ReportType
  @Field({ nullable: true })
  caseId: number
  @Field({ nullable: true })
  witnessId: string
  @Field({ nullable: true })
  audio: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
