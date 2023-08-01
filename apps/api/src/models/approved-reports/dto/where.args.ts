import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { OfficerWhereInput } from 'src/models/officers/dto/where.args'
import { ReportRelationFilter } from 'src/models/reports/dto/where.args'

@InputType()
export class ApprovedReportWhereUniqueInput {
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class ApprovedReportWhereInput
  implements
    RestrictProperties<
      ApprovedReportWhereInput,
      Prisma.ApprovedReportWhereInput
    >
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  description: StringFilter
  @Field(() => StringFilter, { nullable: true })
  officerId: StringFilter
  @Field(() => ReportRelationFilter, { nullable: true })
  report: ReportRelationFilter
  @Field(() => OfficerWhereInput, { nullable: true })
  officer: OfficerWhereInput

  @Field(() => [ApprovedReportWhereInput], { nullable: true })
  AND: ApprovedReportWhereInput[]
  @Field(() => [ApprovedReportWhereInput], { nullable: true })
  OR: ApprovedReportWhereInput[]
  @Field(() => [ApprovedReportWhereInput], { nullable: true })
  NOT: ApprovedReportWhereInput[]
}

@InputType()
export class ApprovedReportListRelationFilter {
  @Field(() => ApprovedReportWhereInput, { nullable: true })
  every: ApprovedReportWhereInput
  @Field(() => ApprovedReportWhereInput, { nullable: true })
  some: ApprovedReportWhereInput
  @Field(() => ApprovedReportWhereInput, { nullable: true })
  none: ApprovedReportWhereInput
}

@InputType()
export class ApprovedReportRelationFilter {
  @Field(() => ApprovedReportWhereInput, { nullable: true })
  is: ApprovedReportWhereInput
  @Field(() => ApprovedReportWhereInput, { nullable: true })
  isNot: ApprovedReportWhereInput
}
