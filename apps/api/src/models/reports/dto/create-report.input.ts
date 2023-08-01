import { InputType, OmitType, PickType } from '@nestjs/graphql'
import { Report } from '../entities/report.entity'

@InputType()
export class CreateReportInput extends PickType(
  Report,
  ['audio', 'caseId', 'description', 'locationId', 'time', 'type', 'witnessId'],
  InputType,
) {}

@InputType()
export class CreateReportInputWithoutCaseId extends OmitType(
  CreateReportInput,
  ['caseId'],
) {}
