import { CreateWitnessInput } from './create-witness.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Witness } from '@prisma/client'

@InputType()
export class UpdateWitnessInput extends PartialType(CreateWitnessInput) {
  uid: Witness['uid']
}
