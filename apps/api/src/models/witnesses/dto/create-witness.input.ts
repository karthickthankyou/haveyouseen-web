import { InputType, PickType } from '@nestjs/graphql'
import { Witness } from '../entities/witness.entity'

@InputType()
export class CreateWitnessInput extends PickType(
  Witness,
  ['name', 'uid'],
  InputType,
) {}
