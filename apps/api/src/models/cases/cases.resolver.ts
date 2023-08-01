import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { CasesService } from './cases.service'
import { Case } from './entities/case.entity'
import { FindManyCaseArgs, FindUniqueCaseArgs } from './dto/find.args'
import { CreateCaseInput } from './dto/create-case.input'
import { UpdateCaseInput } from './dto/update-case.input'
import { AllowAuthenticated } from 'src/common/decorators/auth/auth.decorator'
import { Report } from '../reports/entities/report.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { MissingPerson } from '../missing-people/entities/missing-person.entity'
import { DateFilterInput, LocationFilterInput } from './dto/filter.input'

@Resolver(() => Case)
export class CasesResolver {
  constructor(
    private readonly casesService: CasesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
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

  @AllowAuthenticated()
  @Mutation(() => Case)
  updateCase(@Args('updateCaseInput') args: UpdateCaseInput) {
    return this.casesService.update(args)
  }

  @Query(() => [Report])
  searchCases(
    @Args('dateFilter', { nullable: true }) dateFilter: DateFilterInput,
    @Args('locationFilter')
    locationFilter: LocationFilterInput,
  ) {
    const { end, start } = dateFilter
    const { nw_lat, nw_lng, se_lat, se_lng } = locationFilter

    return this.prisma.report.findMany({
      distinct: ['caseId'],
      where: {
        time: { gte: new Date(start), lte: new Date(end) },
        location: {
          is: {
            latitude: { lte: nw_lat, gte: se_lat },
            longitude: { gte: nw_lng, lte: se_lng },
          },
        },
      },
    })
  }

  @AllowAuthenticated()
  @Mutation(() => Case)
  removeCase(@Args() args: FindUniqueCaseArgs) {
    return this.casesService.remove(args)
  }

  @ResolveField(() => [Report])
  reports(@Parent() parent: Case) {
    return this.prisma.report.findMany({
      where: { caseId: { equals: parent.id } },
    })
  }

  @ResolveField(() => MissingPerson)
  missingPerson(@Parent() parent: Case) {
    return this.prisma.missingPerson.findUnique({
      where: { id: parent.missingPersonId },
    })
  }
}
