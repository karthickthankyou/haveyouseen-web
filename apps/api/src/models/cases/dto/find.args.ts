import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CaseOrderByWithRelationInput } from './orderBy.args'
import { CaseWhereInput, CaseWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.CaseScalarFieldEnum, {
  name: 'CaseScalarFieldEnum',
})

@ArgsType()
export class FindManyCaseArgs
  implements
    RestrictProperties<
      FindManyCaseArgs,
      Omit<Prisma.CaseFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => CaseWhereInput, { nullable: true })
  where: CaseWhereInput
  @Field(() => [CaseOrderByWithRelationInput], { nullable: true })
  orderBy: CaseOrderByWithRelationInput[]
  @Field(() => CaseWhereUniqueInput, { nullable: true })
  cursor: CaseWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.CaseScalarFieldEnum], { nullable: true })
  distinct: Prisma.CaseScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueCaseArgs {
  @Field({ nullable: true })
  where: CaseWhereUniqueInput
}
