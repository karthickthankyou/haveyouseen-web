import { InputType, PickType } from '@nestjs/graphql'
import { ApprovedReport } from '../entities/approved-report.entity'

@InputType()
export class CreateApprovedReportInput extends PickType(
  ApprovedReport,
  ['description', 'officerId', 'id'],
  InputType,
) {}
