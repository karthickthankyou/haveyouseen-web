import { CreateMissingPersonInput } from './create-missing-person.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { MissingPerson } from '@prisma/client'

@InputType()
export class UpdateMissingPersonInput extends PartialType(
  CreateMissingPersonInput,
) {
  id: MissingPerson['id']
}
