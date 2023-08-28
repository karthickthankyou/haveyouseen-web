import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ReportOrderByWithRelationInput } from 'src/models/reports/dto/orderBy.args'
import { WitnessOrderByWithRelationInput } from 'src/models/witnesses/dto/orderBy.args'

@InputType()
export class CommentOrderByWithRelationInput
  implements
    RestrictProperties<
      CommentOrderByWithRelationInput,
      Prisma.CommentOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  content: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  reportId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  witnessUid: Prisma.SortOrder
  @Field(() => ReportOrderByWithRelationInput, { nullable: true })
  Report: ReportOrderByWithRelationInput
  @Field(() => WitnessOrderByWithRelationInput, { nullable: true })
  Witness: WitnessOrderByWithRelationInput
}

@InputType()
export class CommentOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
