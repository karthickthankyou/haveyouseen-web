import { Injectable } from '@nestjs/common'
import { FindManyWitnessArgs, FindUniqueWitnessArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateWitnessInput } from './dto/create-witness.input'
import { UpdateWitnessInput } from './dto/update-witness.input'

@Injectable()
export class WitnessesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createWitnessInput: CreateWitnessInput) {
    return this.prisma.witness.create({
      data: createWitnessInput,
    })
  }

  findAll(args: FindManyWitnessArgs) {
    return this.prisma.witness.findMany(args)
  }

  findOne(args: FindUniqueWitnessArgs) {
    return this.prisma.witness.findUnique(args)
  }

  update(updateWitnessInput: UpdateWitnessInput) {
    const { uid, ...data } = updateWitnessInput
    return this.prisma.witness.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueWitnessArgs) {
    return this.prisma.witness.delete(args)
  }
}
