import { InputType, PickType } from '@nestjs/graphql'
import { Case } from '../entities/case.entity'

@InputType()
export class CreateCaseInput extends PickType(
  Case,
  ['contact', 'missingPersonId', 'status'],
  InputType,
) {}
