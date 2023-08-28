import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { CommentsService } from './comments.service'
import { Comment } from './entity/comment.entity'
import { FindManyCommentArgs, FindUniqueCommentArgs } from './dtos/find.args'
import { CreateCommentInput } from './dtos/create-comment.input'

import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { Report } from '../reports/entities/report.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Witness } from '../witnesses/entities/witness.entity'

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') args: CreateCommentInput,
    @GetUser() user: GetUserType,
  ) {
    return this.commentsService.create(args, user)
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll(@Args() args: FindManyCommentArgs) {
    return this.commentsService.findAll(args)
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args() args: FindUniqueCommentArgs) {
    return this.commentsService.findOne(args)
  }

  @ResolveField(() => Report, { nullable: true })
  report(@Parent() parent: Comment) {
    return this.prisma.report.findUnique({
      where: { id: parent.reportId },
    })
  }

  @ResolveField(() => Witness, { nullable: true })
  witness(@Parent() parent: Comment) {
    return this.prisma.witness.findUnique({
      where: { uid: parent.witnessUid },
    })
  }
}
