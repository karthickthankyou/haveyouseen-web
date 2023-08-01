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
import { CreateReportInput } from './dto/create-report.input'
import { UpdateReportInput } from './dto/update-report.input'
import { AllowAuthenticated } from 'src/common/decorators/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApprovedReport } from '../approved-reports/entities/approved-report.entity'
import { Witness } from '../witnesses/entities/witness.entity'

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

  @ResolveField(() => Location)
  location(@Parent() parent: Report) {
    return this.prisma.location.findUnique({
      where: { id: parent.locationId },
    })
  }

  @ResolveField(() => ApprovedReport)
  approvedReport(@Parent() parent: Report) {
    return this.prisma.approvedReport.findUnique({
      where: { id: parent.id },
    })
  }

  @ResolveField(() => Witness)
  witness(@Parent() parent: Report) {
    return this.prisma.witness.findUnique({
      where: { uid: parent.witnessId },
    })
  }
}
