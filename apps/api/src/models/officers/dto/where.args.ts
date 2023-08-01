import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ApprovedReportListRelationFilter } from 'src/models/approved-reports/dto/where.args'

@InputType()
export class OfficerWhereUniqueInput {
  @Field(() => String, { nullable: true })
  uid: string
}

@InputType()
export class OfficerWhereInput
  implements RestrictProperties<OfficerWhereInput, Prisma.OfficerWhereInput>
{
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  uid: StringFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => ApprovedReportListRelationFilter, { nullable: true })
  approvedReports: ApprovedReportListRelationFilter

  @Field(() => [OfficerWhereInput], { nullable: true })
  AND: OfficerWhereInput[]
  @Field(() => [OfficerWhereInput], { nullable: true })
  OR: OfficerWhereInput[]
  @Field(() => [OfficerWhereInput], { nullable: true })
  NOT: OfficerWhereInput[]
}

@InputType()
export class OfficerListRelationFilter {
  @Field(() => OfficerWhereInput, { nullable: true })
  every: OfficerWhereInput
  @Field(() => OfficerWhereInput, { nullable: true })
  some: OfficerWhereInput
  @Field(() => OfficerWhereInput, { nullable: true })
  none: OfficerWhereInput
}

@InputType()
export class OfficerRelationFilter {
  @Field(() => OfficerWhereInput, { nullable: true })
  is: OfficerWhereInput
  @Field(() => OfficerWhereInput, { nullable: true })
  isNot: OfficerWhereInput
}
