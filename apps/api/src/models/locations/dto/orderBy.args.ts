import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ReportOrderByRelationAggregateInput } from 'src/models/reports/dto/orderBy.args'

@InputType()
export class LocationOrderByWithRelationInput
  implements
    RestrictProperties<
      LocationOrderByWithRelationInput,
      Prisma.LocationOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  latitude: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  longitude: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  address: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => ReportOrderByRelationAggregateInput, { nullable: true })
  reports: ReportOrderByRelationAggregateInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class LocationOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
