import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { MissingPeopleService } from './missing-people.service'
import { MissingPerson } from './entities/missing-person.entity'
import {
  FindManyMissingPersonArgs,
  FindUniqueMissingPersonArgs,
} from './dto/find.args'
import { CreateMissingPersonInput } from './dto/create-missing-person.input'
import { UpdateMissingPersonInput } from './dto/update-missing-person.input'
import { AllowAuthenticated } from 'src/common/decorators/auth/auth.decorator'
import { Case } from '../cases/entities/case.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => MissingPerson)
export class MissingPeopleResolver {
  constructor(
    private readonly missingPeopleService: MissingPeopleService,
    private readonly prisma: PrismaService,
  ) {}
  @AllowAuthenticated()
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

  @AllowAuthenticated()
  @Mutation(() => MissingPerson)
  updateMissingPerson(
    @Args('updateMissingPersonInput') args: UpdateMissingPersonInput,
  ) {
    return this.missingPeopleService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => MissingPerson)
  removeMissingPerson(@Args() args: FindUniqueMissingPersonArgs) {
    return this.missingPeopleService.remove(args)
  }
  @ResolveField(() => Case)
  case(@Parent() parent: MissingPerson) {
    return this.prisma.case.findUnique({
      where: { missingPersonId: parent.id },
    })
  }
}
