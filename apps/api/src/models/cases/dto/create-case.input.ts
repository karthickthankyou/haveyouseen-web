import { Field, InputType, PickType } from '@nestjs/graphql'
import { Case } from '../entities/case.entity'

import { CreateMissingPersonInput } from 'src/models/missing-people/dto/create-missing-person.input'

@InputType()
export class CreateCaseInput extends PickType(
  Case,
  ['contact', 'status'],
  InputType,
) {
  @Field(() => CreateMissingPersonInput)
  missingPerson: CreateMissingPersonInput
}
