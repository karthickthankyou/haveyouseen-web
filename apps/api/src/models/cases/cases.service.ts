import { Injectable } from '@nestjs/common'
import { FindManyCaseArgs, FindUniqueCaseArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateCaseInput } from './dto/create-case.input'
import { UpdateCaseInput } from './dto/update-case.input'

@Injectable()
export class CasesService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ missingPerson, reports, ...args }: CreateCaseInput) {
    try {
      const createdMissingPerson = await this.prisma.missingPerson.create({
        data: missingPerson,
      })
      const createdCase = await this.prisma.case.create({
        data: {
          ...args,
          missingPerson: { connect: { id: createdMissingPerson.id } },
        },
      })

      const newReports = await Promise.all(
        reports.map(({ location, locationId, witnessId, ...report }) =>
          this.prisma.report.create({
            data: {
              ...report,
              case: { connect: { id: createdCase.id } },
              location: { create: location },
              witness: {
                connect: {
                  uid: witnessId,
                },
              },
              approvedReport: {
                create: {
                  officerId: witnessId,
                  description: report.description,
                },
              },
            },
          }),
        ),
      )

      console.log('newReports ', newReports)

      return createdCase
    } catch (err) {
      console.log('err', err)
    }
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
