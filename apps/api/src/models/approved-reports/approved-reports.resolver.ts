import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ApprovedReportsService } from './approved-reports.service'
import { ApprovedReport } from './entities/approved-report.entity'
import {
  FindManyApprovedReportArgs,
  FindUniqueApprovedReportArgs,
} from './dto/find.args'
import { CreateApprovedReportInput } from './dto/create-approved-report.input'
import { UpdateApprovedReportInput } from './dto/update-approved-report.input'

@Resolver(() => ApprovedReport)
export class ApprovedReportsResolver {
  constructor(
    private readonly approvedReportsService: ApprovedReportsService,
  ) {}

  @Mutation(() => ApprovedReport)
  createApprovedReport(
    @Args('createApprovedReportInput') args: CreateApprovedReportInput,
  ) {
    return this.approvedReportsService.create(args)
  }

  @Query(() => [ApprovedReport], { name: 'approvedReports' })
  findAll(@Args() args: FindManyApprovedReportArgs) {
    return this.approvedReportsService.findAll(args)
  }

  @Query(() => ApprovedReport, { name: 'approvedReport' })
  findOne(@Args() args: FindUniqueApprovedReportArgs) {
    return this.approvedReportsService.findOne(args)
  }

  @Mutation(() => ApprovedReport)
  updateApprovedReport(
    @Args('updateApprovedReportInput') args: UpdateApprovedReportInput,
  ) {
    return this.approvedReportsService.update(args)
  }

  @Mutation(() => ApprovedReport)
  removeApprovedReport(@Args() args: FindUniqueApprovedReportArgs) {
    return this.approvedReportsService.remove(args)
  }
}
