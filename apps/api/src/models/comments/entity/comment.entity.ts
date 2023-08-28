import { ObjectType } from '@nestjs/graphql'
import { Comment as CommentType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Comment implements RestrictProperties<Comment, CommentType> {
  id: number
  createdAt: Date
  updatedAt: Date
  content: string
  reportId: number
  witnessUid: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
