import { Injectable } from '@nestjs/common'
import {
  FindManyApprovedReportArgs,
  FindUniqueApprovedReportArgs,
} from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateApprovedReportInput } from './dto/create-approved-report.input'
import { UpdateApprovedReportInput } from './dto/update-approved-report.input'

@Injectable()
export class ApprovedReportsService {
  constructor(private readonly prisma: PrismaService) {}
  create(
    createApprovedReportInput: CreateApprovedReportInput,
    officerId: string,
  ) {
    return this.prisma.approvedReport.create({
      data: { ...createApprovedReportInput, officerId },
    })
  }

  findAll(args: FindManyApprovedReportArgs) {
    return this.prisma.approvedReport.findMany(args)
  }

  findOne(args: FindUniqueApprovedReportArgs) {
    return this.prisma.approvedReport.findUnique(args)
  }

  update(updateApprovedReportInput: UpdateApprovedReportInput) {
    const { id, ...data } = updateApprovedReportInput
    return this.prisma.approvedReport.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueApprovedReportArgs) {
    return this.prisma.approvedReport.delete(args)
  }
}
