import { CreateCommentInput } from './create-comment.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Comment } from '@prisma/client'

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  id: Comment['id']
}
