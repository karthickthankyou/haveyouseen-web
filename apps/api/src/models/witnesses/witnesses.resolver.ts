import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { WitnessesService } from './witnesses.service'
import { Witness } from './entities/witness.entity'
import { FindManyWitnessArgs, FindUniqueWitnessArgs } from './dto/find.args'
import { CreateWitnessInput } from './dto/create-witness.input'
import { UpdateWitnessInput } from './dto/update-witness.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Report } from '../reports/entities/report.entity'
import { GetUserType } from 'src/common/types'

@Resolver(() => Witness)
export class WitnessesResolver {
  constructor(
    private readonly witnessesService: WitnessesService,
    private readonly prisma: PrismaService,
  ) {}
  @AllowAuthenticated()
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

  @AllowAuthenticated()
  @Query(() => Witness, { name: 'witnessMe', nullable: true })
  witnessMe(@Args() args: FindUniqueWitnessArgs, @GetUser() user: GetUserType) {
    return this.witnessesService.findOne({ where: { uid: user.uid } })
  }

  @AllowAuthenticated()
  @Mutation(() => Witness)
  updateWitness(@Args('updateWitnessInput') args: UpdateWitnessInput) {
    return this.witnessesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Witness)
  removeWitness(@Args() args: FindUniqueWitnessArgs) {
    return this.witnessesService.remove(args)
  }

  @ResolveField(() => [Report])
  reports(@Parent() parent: Witness) {
    return this.prisma.report.findMany({
      where: { witnessId: { equals: parent.uid } },
    })
  }
}
