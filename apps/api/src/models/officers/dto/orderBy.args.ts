import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ApprovedReportOrderByRelationAggregateInput } from 'src/models/approved-reports/dto/orderBy.args'

@InputType()
export class OfficerOrderByWithRelationInput
  implements
    RestrictProperties<
      OfficerOrderByWithRelationInput,
      Prisma.OfficerOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  name: Prisma.SortOrder
  @Field(() => ApprovedReportOrderByRelationAggregateInput, { nullable: true })
  approvedReports: ApprovedReportOrderByRelationAggregateInput
}

@InputType()
export class OfficerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
