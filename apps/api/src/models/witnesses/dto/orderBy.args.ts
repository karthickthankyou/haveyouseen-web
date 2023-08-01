import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ReportOrderByRelationAggregateInput } from 'src/models/reports/dto/orderBy.args'

@InputType()
export class WitnessOrderByWithRelationInput
  implements
    RestrictProperties<
      WitnessOrderByWithRelationInput,
      Prisma.WitnessOrderByWithRelationInput
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
  @Field(() => ReportOrderByRelationAggregateInput, { nullable: true })
  reports: ReportOrderByRelationAggregateInput
}

@InputType()
export class WitnessOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
