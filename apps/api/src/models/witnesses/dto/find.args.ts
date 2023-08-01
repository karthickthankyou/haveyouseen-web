import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { WitnessOrderByWithRelationInput } from './orderBy.args'
import { WitnessWhereInput, WitnessWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.WitnessScalarFieldEnum, {
  name: 'WitnessScalarFieldEnum',
})

@ArgsType()
export class FindManyWitnessArgs
  implements
    RestrictProperties<
      FindManyWitnessArgs,
      Omit<Prisma.WitnessFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => WitnessWhereInput, { nullable: true })
  where: WitnessWhereInput
  @Field(() => [WitnessOrderByWithRelationInput], { nullable: true })
  orderBy: WitnessOrderByWithRelationInput[]
  @Field(() => WitnessWhereUniqueInput, { nullable: true })
  cursor: WitnessWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.WitnessScalarFieldEnum], { nullable: true })
  distinct: Prisma.WitnessScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueWitnessArgs {
  @Field({ nullable: true })
  where: WitnessWhereUniqueInput
}
