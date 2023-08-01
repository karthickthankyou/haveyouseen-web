import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { OfficerOrderByWithRelationInput } from 'src/models/officers/dto/orderBy.args'
import { ReportOrderByWithRelationInput } from 'src/models/reports/dto/orderBy.args'

@InputType()
export class ApprovedReportOrderByWithRelationInput
  implements
    RestrictProperties<
      ApprovedReportOrderByWithRelationInput,
      Prisma.ApprovedReportOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  description: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  officerId: Prisma.SortOrder
  @Field(() => ReportOrderByWithRelationInput, { nullable: true })
  report: ReportOrderByWithRelationInput
  @Field(() => OfficerOrderByWithRelationInput, { nullable: true })
  officer: OfficerOrderByWithRelationInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class ApprovedReportOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
