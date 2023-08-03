import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { MissingPersonOrderByWithRelationInput } from 'src/models/missing-people/dto/orderBy.args'
import { ReportOrderByRelationAggregateInput } from 'src/models/reports/dto/orderBy.args'

@InputType()
export class CaseOrderByWithRelationInput
  implements
    RestrictProperties<
      CaseOrderByWithRelationInput,
      Prisma.CaseOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  missingPersonId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  status: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  contact: Prisma.SortOrder
  @Field(() => MissingPersonOrderByWithRelationInput, { nullable: true })
  missingPerson: MissingPersonOrderByWithRelationInput
  @Field(() => ReportOrderByRelationAggregateInput, { nullable: true })
  reports: ReportOrderByRelationAggregateInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class CaseOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
