import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ApprovedReportOrderByWithRelationInput } from './orderBy.args'
import {
  ApprovedReportWhereInput,
  ApprovedReportWhereUniqueInput,
} from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ApprovedReportScalarFieldEnum, {
  name: 'ApprovedReportScalarFieldEnum',
})

@ArgsType()
export class FindManyApprovedReportArgs
  implements
    RestrictProperties<
      FindManyApprovedReportArgs,
      Omit<Prisma.ApprovedReportFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => ApprovedReportWhereInput, { nullable: true })
  where: ApprovedReportWhereInput
  @Field(() => [ApprovedReportOrderByWithRelationInput], { nullable: true })
  orderBy: ApprovedReportOrderByWithRelationInput[]
  @Field(() => ApprovedReportWhereUniqueInput, { nullable: true })
  cursor: ApprovedReportWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ApprovedReportScalarFieldEnum], { nullable: true })
  distinct: Prisma.ApprovedReportScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueApprovedReportArgs {
  @Field({ nullable: true })
  where: ApprovedReportWhereUniqueInput
}
