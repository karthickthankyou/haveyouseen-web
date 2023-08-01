import { Injectable } from '@nestjs/common'
import {
  FindManyMissingPersonArgs,
  FindUniqueMissingPersonArgs,
} from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateMissingPersonInput } from './dto/create-missing-person.input'
import { UpdateMissingPersonInput } from './dto/update-missing-person.input'

@Injectable()
export class MissingPeopleService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMissingPersonInput: CreateMissingPersonInput) {
    return this.prisma.missingPerson.create({
      data: createMissingPersonInput,
    })
  }

  findAll(args: FindManyMissingPersonArgs) {
    return this.prisma.missingPerson.findMany(args)
  }

  findOne(args: FindUniqueMissingPersonArgs) {
    return this.prisma.missingPerson.findUnique(args)
  }

  update(updateMissingPersonInput: UpdateMissingPersonInput) {
    const { id, ...data } = updateMissingPersonInput
    return this.prisma.missingPerson.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueMissingPersonArgs) {
    return this.prisma.missingPerson.delete(args)
  }
}
