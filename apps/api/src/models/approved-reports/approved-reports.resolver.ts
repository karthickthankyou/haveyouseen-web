import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ApprovedReportsService } from './approved-reports.service'
import { ApprovedReport } from './entities/approved-report.entity'
import {
  FindManyApprovedReportArgs,
  FindUniqueApprovedReportArgs,
} from './dto/find.args'
import { CreateApprovedReportInput } from './dto/create-approved-report.input'
import { UpdateApprovedReportInput } from './dto/update-approved-report.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { Officer } from '../officers/entities/officer.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Report } from '../reports/entities/report.entity'
import { GetUserType } from 'src/common/types'

@Resolver(() => ApprovedReport)
export class ApprovedReportsResolver {
  constructor(
    private readonly approvedReportsService: ApprovedReportsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => ApprovedReport)
  async createApprovedReport(
    @Args('createApprovedReportInput') args: CreateApprovedReportInput,
    @GetUser() user: GetUserType,
  ) {
    const officer = await this.prisma.officer.findUnique({
      where: { uid: user.uid },
    })
    return this.approvedReportsService.create(args, officer.uid)
  }

  @Query(() => [ApprovedReport], { name: 'approvedReports' })
  findAll(@Args() args: FindManyApprovedReportArgs) {
    return this.approvedReportsService.findAll(args)
  }

  @Query(() => ApprovedReport, { name: 'approvedReport' })
  findOne(@Args() args: FindUniqueApprovedReportArgs) {
    return this.approvedReportsService.findOne(args)
  }

  @AllowAuthenticated('officer')
  @Mutation(() => ApprovedReport)
  updateApprovedReport(
    @Args('updateApprovedReportInput') args: UpdateApprovedReportInput,
  ) {
    return this.approvedReportsService.update(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => ApprovedReport)
  removeApprovedReport(@Args() args: FindUniqueApprovedReportArgs) {
    return this.approvedReportsService.remove(args)
  }

  @ResolveField(() => Officer, { nullable: true })
  officer(@Parent() parent: ApprovedReport) {
    return this.prisma.officer.findUnique({
      where: { uid: parent.officerId },
    })
  }

  @ResolveField(() => Report)
  report(@Parent() parent: ApprovedReport) {
    return this.prisma.report.findUnique({
      where: { id: parent.id },
    })
  }
}
