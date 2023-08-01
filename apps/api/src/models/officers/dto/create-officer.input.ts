import { InputType, PickType } from '@nestjs/graphql'
import { Officer } from '../entities/officer.entity'

@InputType()
export class CreateOfficerInput extends PickType(
  Officer,
  ['name', 'uid'],
  InputType,
) {}
