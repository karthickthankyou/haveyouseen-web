import { Injectable } from '@nestjs/common'
import { FindManyCommentArgs, FindUniqueCommentArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateCommentInput } from './dtos/create-comment.input'
import { UpdateCommentInput } from './dtos/update-comment.input'
import { GetUserType } from 'src/common/types'

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCommentInput: CreateCommentInput, user: GetUserType) {
    return this.prisma.comment.create({
      data: { ...createCommentInput, witnessUid: user.uid },
    })
  }

  findAll(args: FindManyCommentArgs) {
    return this.prisma.comment.findMany(args)
  }

  findOne(args: FindUniqueCommentArgs) {
    return this.prisma.comment.findUnique(args)
  }

  update(updateCommentInput: UpdateCommentInput) {
    const { id, ...data } = updateCommentInput
    return this.prisma.comment.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueCommentArgs) {
    return this.prisma.comment.delete(args)
  }
}
