import { Injectable } from '@nestjs/common'
import { FindManyCaseArgs, FindUniqueCaseArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateCaseInput } from './dto/create-case.input'
import { UpdateCaseInput } from './dto/update-case.input'

@Injectable()
export class CasesService {
  constructor(private readonly prisma: PrismaService) {}
  create({ missingPerson, reports, ...args }: CreateCaseInput) {
    return this.prisma.case.create({
      data: {
        ...args,
        missingPerson: { create: missingPerson },
        reports: { createMany: { data: reports } },
      },
    })
  }

  findAll(args: FindManyCaseArgs) {
    return this.prisma.case.findMany(args)
  }

  findOne(args: FindUniqueCaseArgs) {
    return this.prisma.case.findUnique(args)
  }

  update(updateCaseInput: UpdateCaseInput) {
    const { id, missingPerson, reports, ...data } = updateCaseInput
    return this.prisma.case.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueCaseArgs) {
    return this.prisma.case.delete(args)
  }
}
