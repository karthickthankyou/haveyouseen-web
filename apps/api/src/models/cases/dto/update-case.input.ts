import { CreateCaseInput } from './create-case.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Case } from '@prisma/client'

@InputType()
export class UpdateCaseInput extends PartialType(CreateCaseInput) {
  id: Case['id']
}
