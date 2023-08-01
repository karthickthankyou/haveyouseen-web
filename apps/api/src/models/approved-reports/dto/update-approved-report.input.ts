import { CreateApprovedReportInput } from './create-approved-report.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { ApprovedReport } from '@prisma/client'

@InputType()
export class UpdateApprovedReportInput extends PartialType(
  CreateApprovedReportInput,
) {
  id: ApprovedReport['id']
}
