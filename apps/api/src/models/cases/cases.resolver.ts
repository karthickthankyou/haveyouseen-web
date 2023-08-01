import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CasesService } from './cases.service'
import { Case } from './entities/case.entity'
import { FindManyCaseArgs, FindUniqueCaseArgs } from './dto/find.args'
import { CreateCaseInput } from './dto/create-case.input'
import { UpdateCaseInput } from './dto/update-case.input'

@Resolver(() => Case)
export class CasesResolver {
  constructor(private readonly casesService: CasesService) {}

  @Mutation(() => Case)
  createCase(@Args('createCaseInput') args: CreateCaseInput) {
    return this.casesService.create(args)
  }

  @Query(() => [Case], { name: 'cases' })
  findAll(@Args() args: FindManyCaseArgs) {
    return this.casesService.findAll(args)
  }

  @Query(() => Case, { name: 'case' })
  findOne(@Args() args: FindUniqueCaseArgs) {
    return this.casesService.findOne(args)
  }

  @Mutation(() => Case)
  updateCase(@Args('updateCaseInput') args: UpdateCaseInput) {
    return this.casesService.update(args)
  }

  @Mutation(() => Case)
  removeCase(@Args() args: FindUniqueCaseArgs) {
    return this.casesService.remove(args)
  }
}
