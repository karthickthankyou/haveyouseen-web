import { Field, InputType } from '@nestjs/graphql'
import { $Enums, Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringListFilter,
} from 'src/common/dtos/common.input'
import { MissingPersonRelationFilter } from 'src/models/missing-people/dto/where.args'
import { ReportListRelationFilter } from 'src/models/reports/dto/where.args'

@InputType()
export class CaseWhereUniqueInput {
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class EnumStatusFilter {
  @Field(() => $Enums.Status)
  equals?: $Enums.Status;
  @Field(() => [$Enums.Status])
  in?: $Enums.Status[]
  @Field(() => [$Enums.Status])
  notIn?: $Enums.Status[]
  @Field(() => $Enums.Status)
  not?: $Enums.Status
}

@InputType()
export class CaseWhereInput
  implements RestrictProperties<CaseWhereInput, Prisma.CaseWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  missingPersonId: IntFilter
  @Field(() => EnumStatusFilter, { nullable: true })
  status: Prisma.EnumStatusFilter
  @Field(() => StringListFilter, { nullable: true })
  contact: StringListFilter
  @Field(() => MissingPersonRelationFilter, { nullable: true })
  missingPerson: MissingPersonRelationFilter
  @Field(() => ReportListRelationFilter, { nullable: true })
  privateReports: ReportListRelationFilter
  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [CaseWhereInput], { nullable: true })
  AND: CaseWhereInput[]
  @Field(() => [CaseWhereInput], { nullable: true })
  OR: CaseWhereInput[]
  @Field(() => [CaseWhereInput], { nullable: true })
  NOT: CaseWhereInput[]
}

@InputType()
export class CaseListRelationFilter {
  @Field(() => CaseWhereInput, { nullable: true })
  every: CaseWhereInput
  @Field(() => CaseWhereInput, { nullable: true })
  some: CaseWhereInput
  @Field(() => CaseWhereInput, { nullable: true })
  none: CaseWhereInput
}

@InputType()
export class CaseRelationFilter {
  @Field(() => CaseWhereInput, { nullable: true })
  is: CaseWhereInput
  @Field(() => CaseWhereInput, { nullable: true })
  isNot: CaseWhereInput
}
