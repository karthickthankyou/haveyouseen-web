import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { OfficerOrderByWithRelationInput } from './orderBy.args'
import { OfficerWhereInput, OfficerWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.OfficerScalarFieldEnum, {
  name: 'OfficerScalarFieldEnum',
})

@ArgsType()
export class FindManyOfficerArgs
  implements
    RestrictProperties<
      FindManyOfficerArgs,
      Omit<Prisma.OfficerFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => OfficerWhereInput, { nullable: true })
  where: OfficerWhereInput
  @Field(() => [OfficerOrderByWithRelationInput], { nullable: true })
  orderBy: OfficerOrderByWithRelationInput[]
  @Field(() => OfficerWhereUniqueInput, { nullable: true })
  cursor: OfficerWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.OfficerScalarFieldEnum], { nullable: true })
  distinct: Prisma.OfficerScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueOfficerArgs {
  @Field({ nullable: true })
  where: OfficerWhereUniqueInput
}
