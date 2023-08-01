import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { OfficersService } from './officers.service'
import { Officer } from './entities/officer.entity'
import { FindManyOfficerArgs, FindUniqueOfficerArgs } from './dto/find.args'
import { CreateOfficerInput } from './dto/create-officer.input'
import { UpdateOfficerInput } from './dto/update-officer.input'

@Resolver(() => Officer)
export class OfficersResolver {
  constructor(private readonly officersService: OfficersService) {}

  @Mutation(() => Officer)
  createOfficer(@Args('createOfficerInput') args: CreateOfficerInput) {
    return this.officersService.create(args)
  }

  @Query(() => [Officer], { name: 'officers' })
  findAll(@Args() args: FindManyOfficerArgs) {
    return this.officersService.findAll(args)
  }

  @Query(() => Officer, { name: 'officer' })
  findOne(@Args() args: FindUniqueOfficerArgs) {
    return this.officersService.findOne(args)
  }

  @Mutation(() => Officer)
  updateOfficer(@Args('updateOfficerInput') args: UpdateOfficerInput) {
    return this.officersService.update(args)
  }

  @Mutation(() => Officer)
  removeOfficer(@Args() args: FindUniqueOfficerArgs) {
    return this.officersService.remove(args)
  }
}
