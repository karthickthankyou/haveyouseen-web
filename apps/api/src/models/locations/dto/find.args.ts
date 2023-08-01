import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { LocationOrderByWithRelationInput } from './orderBy.args'
import { LocationWhereInput, LocationWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.LocationScalarFieldEnum, {
  name: 'LocationScalarFieldEnum',
})

@ArgsType()
export class FindManyLocationArgs
  implements
    RestrictProperties<
      FindManyLocationArgs,
      Omit<Prisma.LocationFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => LocationWhereInput, { nullable: true })
  where: LocationWhereInput
  @Field(() => [LocationOrderByWithRelationInput], { nullable: true })
  orderBy: LocationOrderByWithRelationInput[]
  @Field(() => LocationWhereUniqueInput, { nullable: true })
  cursor: LocationWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.LocationScalarFieldEnum], { nullable: true })
  distinct: Prisma.LocationScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueLocationArgs {
  @Field({ nullable: true })
  where: LocationWhereUniqueInput
}
