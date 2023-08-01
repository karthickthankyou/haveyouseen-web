import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

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
  @Field(() => Prisma.SortOrder, { nullable: true })
  missingPerson: Prisma.MissingPersonOrderByWithRelationInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  privateReports: Prisma.ReportOrderByRelationAggregateInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class CaseOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
