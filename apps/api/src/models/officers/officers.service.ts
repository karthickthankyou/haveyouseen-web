import { Injectable } from '@nestjs/common'
import { FindManyOfficerArgs, FindUniqueOfficerArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateOfficerInput } from './dto/create-officer.input'
import { UpdateOfficerInput } from './dto/update-officer.input'

@Injectable()
export class OfficersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createOfficerInput: CreateOfficerInput) {
    return this.prisma.officer.create({
      data: createOfficerInput,
    })
  }

  findAll(args: FindManyOfficerArgs) {
    return this.prisma.officer.findMany(args)
  }

  findOne(args: FindUniqueOfficerArgs) {
    return this.prisma.officer.findUnique(args)
  }

  update(updateOfficerInput: UpdateOfficerInput) {
    const { uid, ...data } = updateOfficerInput
    return this.prisma.officer.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueOfficerArgs) {
    return this.prisma.officer.delete(args)
  }
}
