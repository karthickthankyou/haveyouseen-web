import { Field, InputType, PickType } from '@nestjs/graphql'
import { Case } from '../entities/case.entity'

import { CreateMissingPersonInput } from 'src/models/missing-people/dto/create-missing-person.input'
import { CreateReportInputWithoutCaseId } from 'src/models/reports/dto/create-report.input'

@InputType()
export class CreateCaseInput extends PickType(
  Case,
  ['contact', 'status'],
  InputType,
) {
  @Field(() => CreateMissingPersonInput)
  missingPerson: CreateMissingPersonInput
  @Field(() => [CreateReportInputWithoutCaseId])
  reports: CreateReportInputWithoutCaseId[]
}
