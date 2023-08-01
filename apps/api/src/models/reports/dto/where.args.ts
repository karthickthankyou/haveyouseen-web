import { Field, InputType } from '@nestjs/graphql'
import { $Enums, Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ApprovedReportRelationFilter } from 'src/models/approved-reports/dto/where.args'
import { CaseRelationFilter } from 'src/models/cases/dto/where.args'
import { LocationRelationFilter } from 'src/models/locations/dto/where.args'
import { WitnessRelationFilter } from 'src/models/witnesses/dto/where.args'

@InputType()
export class ReportWhereUniqueInput {
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class EnumReportTypeFilter {
  @Field(() => $Enums.ReportType, { nullable: true })
  equals?: $Enums.ReportType;
  @Field(() => [$Enums.ReportType], { nullable: true })
  in?: $Enums.ReportType[]
  @Field(() => [$Enums.ReportType], { nullable: true })
  notIn?: $Enums.ReportType[]
  @Field(() => $Enums.ReportType, { nullable: true })
  not?: $Enums.ReportType
}

@InputType()
export class ReportWhereInput
  implements RestrictProperties<ReportWhereInput, Prisma.ReportWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  time: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  description: StringFilter
  @Field(() => IntFilter, { nullable: true })
  locationId: IntFilter
  @Field(() => EnumReportTypeFilter, { nullable: true })
  type: EnumReportTypeFilter
  @Field(() => IntFilter, { nullable: true })
  caseId: IntFilter
  @Field(() => StringFilter, { nullable: true })
  witnessId: StringFilter
  @Field(() => StringFilter, { nullable: true })
  audio: StringFilter
  @Field(() => LocationRelationFilter, { nullable: true })
  location: LocationRelationFilter
  @Field(() => CaseRelationFilter, { nullable: true })
  case: CaseRelationFilter
  @Field(() => ApprovedReportRelationFilter, { nullable: true })
  approvedReport: ApprovedReportRelationFilter
  @Field(() => WitnessRelationFilter, { nullable: true })
  witness: WitnessRelationFilter
  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [ReportWhereInput], { nullable: true })
  AND: ReportWhereInput[]
  @Field(() => [ReportWhereInput], { nullable: true })
  OR: ReportWhereInput[]
  @Field(() => [ReportWhereInput], { nullable: true })
  NOT: ReportWhereInput[]
}

@InputType()
export class ReportListRelationFilter {
  @Field(() => ReportWhereInput, { nullable: true })
  every: ReportWhereInput
  @Field(() => ReportWhereInput, { nullable: true })
  some: ReportWhereInput
  @Field(() => ReportWhereInput, { nullable: true })
  none: ReportWhereInput
}

@InputType()
export class ReportRelationFilter {
  @Field(() => ReportWhereInput, { nullable: true })
  is: ReportWhereInput
  @Field(() => ReportWhereInput, { nullable: true })
  isNot: ReportWhereInput
}
