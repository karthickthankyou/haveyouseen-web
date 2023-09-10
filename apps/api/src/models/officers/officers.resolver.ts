import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { OfficersService } from './officers.service'
import { Officer } from './entities/officer.entity'
import { FindManyOfficerArgs, FindUniqueOfficerArgs } from './dto/find.args'
import { CreateOfficerInput } from './dto/create-officer.input'
import { UpdateOfficerInput } from './dto/update-officer.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApprovedReport } from '../approved-reports/entities/approved-report.entity'
import { GetUserType } from 'src/common/types'
import { AuthService } from 'src/common/auth/auth.service'
import { BadRequestException } from '@nestjs/common'

@Resolver(() => Officer)
export class OfficersResolver {
  constructor(
    private readonly officersService: OfficersService,
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Officer)
  async createOfficer(
    @Args('createOfficerInput') args: CreateOfficerInput,
    @GetUser() user: GetUserType,
  ) {
    const officer = await this.prisma.officer.findUnique({
      where: { uid: user.uid },
    })
    if (officer?.uid) {
      throw new BadRequestException('Officer already exists')
    }
    console.log('!!! officer ', officer)

    await this.auth.setRole(user, 'officer')
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

  @AllowAuthenticated()
  @Query(() => Officer, { name: 'officerMe', nullable: true })
  officerMe(@Args() args: FindUniqueOfficerArgs, @GetUser() user: GetUserType) {
    return this.officersService.findOne({ ...args, where: { uid: user.uid } })
  }

  @AllowAuthenticated('officer')
  @Mutation(() => Officer)
  updateOfficer(@Args('updateOfficerInput') args: UpdateOfficerInput) {
    return this.officersService.update(args)
  }

  @AllowAuthenticated('officer')
  @Mutation(() => Officer)
  removeOfficer(@Args() args: FindUniqueOfficerArgs) {
    return this.officersService.remove(args)
  }

  @ResolveField(() => [ApprovedReport])
  approvedReports(@Parent() parent: Officer) {
    return this.prisma.approvedReport.findMany({
      where: { officerId: { equals: parent.uid } },
    })
  }
}
