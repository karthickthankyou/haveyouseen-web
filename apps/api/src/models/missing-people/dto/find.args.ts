import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { MissingPersonOrderByWithRelationInput } from './orderBy.args'
import {
  MissingPersonWhereInput,
  MissingPersonWhereUniqueInput,
} from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.MissingPersonScalarFieldEnum, {
  name: 'MissingPersonScalarFieldEnum',
})

@ArgsType()
export class FindManyMissingPersonArgs
  implements
    RestrictProperties<
      FindManyMissingPersonArgs,
      Omit<Prisma.MissingPersonFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => MissingPersonWhereInput, { nullable: true })
  where: MissingPersonWhereInput
  @Field(() => [MissingPersonOrderByWithRelationInput], { nullable: true })
  orderBy: MissingPersonOrderByWithRelationInput[]
  @Field(() => MissingPersonWhereUniqueInput, { nullable: true })
  cursor: MissingPersonWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.MissingPersonScalarFieldEnum], { nullable: true })
  distinct: Prisma.MissingPersonScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueMissingPersonArgs {
  @Field({ nullable: true })
  where: MissingPersonWhereUniqueInput
}
