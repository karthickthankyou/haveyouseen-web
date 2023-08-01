import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ApprovedReportOrderByWithRelationInput } from 'src/models/approved-reports/dto/orderBy.args'
import { CaseOrderByWithRelationInput } from 'src/models/cases/dto/orderBy.args'
import { LocationOrderByWithRelationInput } from 'src/models/locations/dto/orderBy.args'
import { WitnessOrderByWithRelationInput } from 'src/models/witnesses/dto/orderBy.args'

@InputType()
export class ReportOrderByWithRelationInput
  implements
    RestrictProperties<
      ReportOrderByWithRelationInput,
      Prisma.ReportOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  time: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  description: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  locationId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  type: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  caseId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  witnessId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  audio: Prisma.SortOrder
  @Field(() => LocationOrderByWithRelationInput, { nullable: true })
  location: LocationOrderByWithRelationInput
  @Field(() => CaseOrderByWithRelationInput, { nullable: true })
  case: CaseOrderByWithRelationInput
  @Field(() => ApprovedReportOrderByWithRelationInput, { nullable: true })
  approvedReport: ApprovedReportOrderByWithRelationInput
  @Field(() => WitnessOrderByWithRelationInput, { nullable: true })
  witness: WitnessOrderByWithRelationInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class ReportOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
