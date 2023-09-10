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
import {
  AllowAuthenticated,
  AllowAuthenticatedOptional,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { Report } from '../reports/entities/report.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { MissingPerson } from '../missing-people/entities/missing-person.entity'
import { DateFilterInput, LocationFilterInput } from './dto/filter.input'
import { GetUserType } from 'src/common/types'
import { UpdateCaseInput } from './dto/update-case.input'
import { BadRequestException } from '@nestjs/common'

@Resolver(() => Case)
export class CasesResolver {
  constructor(
    private readonly casesService: CasesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Case)
  async createCase(
    @Args('createCaseInput') args: CreateCaseInput,
    @GetUser() user: GetUserType,
  ) {
    const witness = await this.prisma.witness.findUnique({
      where: { uid: user.uid },
    })
    if (!witness?.uid) {
      await this.prisma.witness.create({ data: { uid: user.uid } })
    }

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
  async updateCaseStatus(
    @Args('updateCaseInput') args: UpdateCaseInput,
    @GetUser() user: GetUserType,
  ) {
    const officer = user?.uid
      ? await this.prisma.officer.findUnique({
          where: { uid: user?.uid },
        })
      : null
    if (!officer?.uid) {
      throw new BadRequestException('You dont have officer rights.')
    }

    return this.casesService.update(args)
  }

  @AllowAuthenticatedOptional()
  @Query(() => [Report])
  async searchCases(
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

  @AllowAuthenticatedOptional()
  @ResolveField(() => [Report])
  async reports(@Parent() parent: Case, @GetUser() user: GetUserType) {
    const officer = user?.uid
      ? await this.prisma.officer.findUnique({
          where: { uid: user?.uid },
        })
      : null
    return this.prisma.report.findMany({
      where: {
        caseId: { equals: parent.id },
        ...(!officer?.uid ? { approvedReport: { isNot: null } } : null),
      },
    })
  }

  @ResolveField(() => MissingPerson)
  missingPerson(@Parent() parent: Case) {
    return this.prisma.missingPerson.findUnique({
      where: { id: parent.missingPersonId },
    })
  }
}
