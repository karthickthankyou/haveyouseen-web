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
  @Field({ nullable: true })
  description: string
  officerId: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
