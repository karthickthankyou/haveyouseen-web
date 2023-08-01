import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ReportsService } from './reports.service'
import { Report } from './entities/report.entity'
import { FindManyReportArgs, FindUniqueReportArgs } from './dto/find.args'
import { CreateReportInput } from './dto/create-report.input'
import { UpdateReportInput } from './dto/update-report.input'

@Resolver(() => Report)
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}

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

  @Mutation(() => Report)
  updateReport(@Args('updateReportInput') args: UpdateReportInput) {
    return this.reportsService.update(args)
  }

  @Mutation(() => Report)
  removeReport(@Args() args: FindUniqueReportArgs) {
    return this.reportsService.remove(args)
  }
}
