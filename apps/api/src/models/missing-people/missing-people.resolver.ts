import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { MissingPeopleService } from './missing-people.service'
import { MissingPerson } from './entities/missing-person.entity'
import {
  FindManyMissingPersonArgs,
  FindUniqueMissingPersonArgs,
} from './dto/find.args'
import { CreateMissingPersonInput } from './dto/create-missing-person.input'
import { UpdateMissingPersonInput } from './dto/update-missing-person.input'

@Resolver(() => MissingPerson)
export class MissingPeopleResolver {
  constructor(private readonly missingPeopleService: MissingPeopleService) {}

  @Mutation(() => MissingPerson)
  createMissingPerson(
    @Args('createMissingPersonInput') args: CreateMissingPersonInput,
  ) {
    return this.missingPeopleService.create(args)
  }

  @Query(() => [MissingPerson], { name: 'missingPeople' })
  findAll(@Args() args: FindManyMissingPersonArgs) {
    return this.missingPeopleService.findAll(args)
  }

  @Query(() => MissingPerson, { name: 'missingPerson' })
  findOne(@Args() args: FindUniqueMissingPersonArgs) {
    return this.missingPeopleService.findOne(args)
  }

  @Mutation(() => MissingPerson)
  updateMissingPerson(
    @Args('updateMissingPersonInput') args: UpdateMissingPersonInput,
  ) {
    return this.missingPeopleService.update(args)
  }

  @Mutation(() => MissingPerson)
  removeMissingPerson(@Args() args: FindUniqueMissingPersonArgs) {
    return this.missingPeopleService.remove(args)
  }
}
