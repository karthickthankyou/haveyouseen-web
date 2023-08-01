import { Field, ObjectType } from '@nestjs/graphql'
import { ApprovedReport as ApprovedReportType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class ApprovedReport
  implements RestrictProperties<ApprovedReport, ApprovedReportType>
{
  id: number
  createdAt: Date
  updatedAt: Date
  description: string
  @Field({ nullable: true })
  officerId: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
