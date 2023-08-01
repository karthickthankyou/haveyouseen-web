import { Injectable } from '@nestjs/common'
import { FindManyReportArgs, FindUniqueReportArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateReportInput } from './dto/create-report.input'
import { UpdateReportInput } from './dto/update-report.input'

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createReportInput: CreateReportInput) {
    return this.prisma.report.create({
      data: createReportInput,
    })
  }

  findAll(args: FindManyReportArgs) {
    return this.prisma.report.findMany(args)
  }

  findOne(args: FindUniqueReportArgs) {
    return this.prisma.report.findUnique(args)
  }

  update(updateReportInput: UpdateReportInput) {
    const { id, ...data } = updateReportInput
    return this.prisma.report.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueReportArgs) {
    return this.prisma.report.delete(args)
  }
}
