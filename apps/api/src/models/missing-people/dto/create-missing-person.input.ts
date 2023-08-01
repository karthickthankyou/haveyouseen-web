import { InputType, PickType } from '@nestjs/graphql'
import { MissingPerson } from '../entities/missing-person.entity'

@InputType()
export class CreateMissingPersonInput extends PickType(
  MissingPerson,
  [
    'bodyType',
    'description',
    'displayName',
    'dob',
    'gender',
    'height',
    'images',
    'missingSince',
    'weight',
  ],
  InputType,
) {}
