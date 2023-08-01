import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ReportOrderByWithRelationInput } from './orderBy.args'
import { ReportWhereInput, ReportWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ReportScalarFieldEnum, {
  name: 'ReportScalarFieldEnum',
})

@ArgsType()
export class FindManyReportArgs
  implements
    RestrictProperties<
      FindManyReportArgs,
      Omit<Prisma.ReportFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => ReportWhereInput, { nullable: true })
  where: ReportWhereInput
  @Field(() => [ReportOrderByWithRelationInput], { nullable: true })
  orderBy: ReportOrderByWithRelationInput[]
  @Field(() => ReportWhereUniqueInput, { nullable: true })
  cursor: ReportWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ReportScalarFieldEnum], { nullable: true })
  distinct: Prisma.ReportScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueReportArgs {
  @Field({ nullable: true })
  where: ReportWhereUniqueInput
}
