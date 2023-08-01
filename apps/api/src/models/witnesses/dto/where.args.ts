import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ReportListRelationFilter } from 'src/models/reports/dto/where.args'

@InputType()
export class WitnessWhereUniqueInput {
  @Field(() => String, { nullable: true })
  uid: string
}

@InputType()
export class WitnessWhereInput
  implements RestrictProperties<WitnessWhereInput, Prisma.WitnessWhereInput>
{
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  uid: StringFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => ReportListRelationFilter, { nullable: true })
  reports: ReportListRelationFilter

  @Field(() => [WitnessWhereInput], { nullable: true })
  AND: WitnessWhereInput[]
  @Field(() => [WitnessWhereInput], { nullable: true })
  OR: WitnessWhereInput[]
  @Field(() => [WitnessWhereInput], { nullable: true })
  NOT: WitnessWhereInput[]
}

@InputType()
export class WitnessListRelationFilter {
  @Field(() => WitnessWhereInput, { nullable: true })
  every: WitnessWhereInput
  @Field(() => WitnessWhereInput, { nullable: true })
  some: WitnessWhereInput
  @Field(() => WitnessWhereInput, { nullable: true })
  none: WitnessWhereInput
}

@InputType()
export class WitnessRelationFilter {
  @Field(() => WitnessWhereInput, { nullable: true })
  is: WitnessWhereInput
  @Field(() => WitnessWhereInput, { nullable: true })
  isNot: WitnessWhereInput
}
