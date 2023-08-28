import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ReportsService } from './reports.service'
import { Report } from './entities/report.entity'
import { Location } from '../locations/entities/location.entity'
import { FindManyReportArgs, FindUniqueReportArgs } from './dto/find.args'
import {
  CreateReportInput,
  CreateReportInputWithoutCaseId,
} from './dto/create-report.input'
import { UpdateReportInput } from './dto/update-report.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApprovedReport } from '../approved-reports/entities/approved-report.entity'
import { Witness } from '../witnesses/entities/witness.entity'
import { Case } from '../cases/entities/case.entity'
import { GetUserType } from 'src/common/types'
import { Comment } from '../comments/entity/comment.entity'

@Resolver(() => Report)
export class ReportsResolver {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Report)
  createReport(@Args('createReportInput') args: CreateReportInput) {
    return this.reportsService.create(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Case)
  async createReports(
    @Args('createReportsInput', {
      type: () => [CreateReportInputWithoutCaseId],
    })
    reports: [CreateReportInputWithoutCaseId],
    @Args('caseId') caseId: number,
    @GetUser() user: GetUserType,
  ) {
    const witness = await this.prisma.witness.findUnique({
      where: { uid: user.uid },
    })
    if (!witness?.uid) {
      await this.prisma.witness.create({ data: { uid: user.uid } })
    }
    console.log('witness', witness)
    const createdReports = await Promise.all(
      reports.map(({ location, locationId, witnessId, ...report }) =>
        this.prisma.report.create({
          data: {
            ...report,
            case: { connect: { id: caseId } },
            location: { create: location },
            witness: {
              connect: {
                uid: witnessId,
              },
            },
          },
        }),
      ),
    )
    console.log('createdReports', createdReports)
    return this.prisma.case.findUnique({ where: { id: caseId } })
  }

  @Query(() => [Report], { name: 'reports' })
  findAll(@Args() args: FindManyReportArgs) {
    return this.reportsService.findAll(args)
  }

  @Query(() => Report, { name: 'report' })
  findOne(@Args() args: FindUniqueReportArgs) {
    return this.reportsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Report)
  updateReport(@Args('updateReportInput') args: UpdateReportInput) {
    return this.reportsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Report)
  removeReport(@Args() args: FindUniqueReportArgs) {
    return this.reportsService.remove(args)
  }

  @ResolveField(() => Location, { nullable: true })
  location(@Parent() parent: Report) {
    return this.prisma.location.findUnique({
      where: { id: parent.locationId },
    })
  }

  @ResolveField(() => ApprovedReport, { nullable: true })
  approvedReport(@Parent() parent: Report) {
    return this.prisma.approvedReport.findUnique({
      where: { id: parent.id },
    })
  }

  @ResolveField(() => Witness, { nullable: true })
  witness(@Parent() parent: Report) {
    return this.prisma.witness.findUnique({
      where: { uid: parent.witnessId },
    })
  }

  @ResolveField(() => Case, { nullable: true })
  case(@Parent() parent: Report) {
    return this.prisma.case.findUnique({
      where: { id: parent.caseId },
    })
  }

  @ResolveField(() => [Comment], { nullable: true })
  comments(@Parent() parent: Report) {
    return this.prisma.comment.findMany({
      where: { reportId: parent.id },
      orderBy: { createdAt: 'desc' },
    })
  }
}
