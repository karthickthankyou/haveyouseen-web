import { InputType, PickType } from '@nestjs/graphql'
import { Comment } from '../entity/comment.entity'

@InputType()
export class CreateCommentInput extends PickType(
  Comment,
  ['content', 'reportId'],
  InputType,
) {}
