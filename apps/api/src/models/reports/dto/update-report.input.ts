import { CreateReportInput } from './create-report.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Report } from '@prisma/client'

@InputType()
export class UpdateReportInput extends PartialType(CreateReportInput) {
  id: Report['id']
}
