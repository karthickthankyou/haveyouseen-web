import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CommentOrderByWithRelationInput } from './order-by.args'
import { CommentWhereInput, CommentWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.CommentScalarFieldEnum, {
  name: 'CommentScalarFieldEnum',
})

@ArgsType()
export class FindManyCommentArgs
  implements
    RestrictProperties<
      FindManyCommentArgs,
      Omit<Prisma.CommentFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => CommentWhereInput, { nullable: true })
  where: CommentWhereInput
  @Field(() => [CommentOrderByWithRelationInput], { nullable: true })
  orderBy: CommentOrderByWithRelationInput[]
  @Field(() => CommentWhereUniqueInput, { nullable: true })
  cursor: CommentWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.CommentScalarFieldEnum], { nullable: true })
  distinct: Prisma.CommentScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueCommentArgs {
  @Field({ nullable: true })
  where: CommentWhereUniqueInput
}
