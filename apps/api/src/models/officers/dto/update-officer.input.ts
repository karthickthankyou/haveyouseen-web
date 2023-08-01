import { CreateOfficerInput } from './create-officer.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Officer } from '@prisma/client'

@InputType()
export class UpdateOfficerInput extends PartialType(CreateOfficerInput) {
  uid: Officer['uid']
}
