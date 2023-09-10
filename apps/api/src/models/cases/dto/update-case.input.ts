import { Field, InputType } from '@nestjs/graphql'
import { $Enums, Case } from '@prisma/client'

@InputType()
export class UpdateCaseInput {
  id: Case['id']
  @Field(() => $Enums.Status)
  status: $Enums.Status
}
