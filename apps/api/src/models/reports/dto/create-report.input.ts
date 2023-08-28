import { Field, InputType, OmitType, PickType } from '@nestjs/graphql'
import { Report } from '../entities/report.entity'
import { CreateLocationInput } from 'src/models/locations/dto/create-location.input'

@InputType()
export class CreateReportInput extends PickType(
  Report,
  [
    'audio',
    'caseId',
    'description',
    'locationId',
    'time',
    'type',
    'witnessId',
    'images',
  ],
  InputType,
) {}

@InputType()
export class CreateReportInputWithoutCaseId extends OmitType(
  CreateReportInput,
  ['caseId'],
) {
  @Field(() => CreateLocationInput)
  location: CreateLocationInput
  showPublic?: boolean
  officerDescription?: string
}
