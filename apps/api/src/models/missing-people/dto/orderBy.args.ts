import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { CaseOrderByWithRelationInput } from 'src/models/cases/dto/orderBy.args'

@InputType()
export class MissingPersonOrderByWithRelationInput
  implements
    RestrictProperties<
      MissingPersonOrderByWithRelationInput,
      Prisma.MissingPersonOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  displayName: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  images: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  dob: Prisma.SortOrder | Prisma.SortOrderInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  gender: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  description: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  missingSince: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  height: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  weight: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  bodyType: Prisma.SortOrder
  @Field(() => CaseOrderByWithRelationInput, { nullable: true })
  case: CaseOrderByWithRelationInput
}

@InputType()
export class MissingPersonOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
