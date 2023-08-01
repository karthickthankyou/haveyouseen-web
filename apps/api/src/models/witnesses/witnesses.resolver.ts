import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { WitnessesService } from './witnesses.service'
import { Witness } from './entities/witness.entity'
import { FindManyWitnessArgs, FindUniqueWitnessArgs } from './dto/find.args'
import { CreateWitnessInput } from './dto/create-witness.input'
import { UpdateWitnessInput } from './dto/update-witness.input'

@Resolver(() => Witness)
export class WitnessesResolver {
  constructor(private readonly witnessesService: WitnessesService) {}

  @Mutation(() => Witness)
  createWitness(@Args('createWitnessInput') args: CreateWitnessInput) {
    return this.witnessesService.create(args)
  }

  @Query(() => [Witness], { name: 'witnesses' })
  findAll(@Args() args: FindManyWitnessArgs) {
    return this.witnessesService.findAll(args)
  }

  @Query(() => Witness, { name: 'witness' })
  findOne(@Args() args: FindUniqueWitnessArgs) {
    return this.witnessesService.findOne(args)
  }

  @Mutation(() => Witness)
  updateWitness(@Args('updateWitnessInput') args: UpdateWitnessInput) {
    return this.witnessesService.update(args)
  }

  @Mutation(() => Witness)
  removeWitness(@Args() args: FindUniqueWitnessArgs) {
    return this.witnessesService.remove(args)
  }
}
