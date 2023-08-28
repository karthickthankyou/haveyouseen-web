import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ReportWhereInput } from 'src/models/reports/dto/where.args'
import { WitnessWhereInput } from 'src/models/witnesses/dto/where.args'

@InputType()
export class CommentWhereUniqueInput {
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class CommentWhereInput
  implements RestrictProperties<CommentWhereInput, Prisma.CommentWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  content: StringFilter
  @Field(() => IntFilter, { nullable: true })
  reportId: IntFilter
  @Field(() => StringFilter, { nullable: true })
  witnessUid: StringFilter
  @Field(() => ReportWhereInput, { nullable: true })
  Report: ReportWhereInput
  @Field(() => WitnessWhereInput, { nullable: true })
  Witness: WitnessWhereInput

  @Field(() => [CommentWhereInput], { nullable: true })
  AND: CommentWhereInput[]
  @Field(() => [CommentWhereInput], { nullable: true })
  OR: CommentWhereInput[]
  @Field(() => [CommentWhereInput], { nullable: true })
  NOT: CommentWhereInput[]
}

@InputType()
export class CommentListRelationFilter {
  @Field(() => CommentWhereInput, { nullable: true })
  every: CommentWhereInput
  @Field(() => CommentWhereInput, { nullable: true })
  some: CommentWhereInput
  @Field(() => CommentWhereInput, { nullable: true })
  none: CommentWhereInput
}

@InputType()
export class CommentRelationFilter {
  @Field(() => CommentWhereInput, { nullable: true })
  is: CommentWhereInput
  @Field(() => CommentWhereInput, { nullable: true })
  isNot: CommentWhereInput
}
