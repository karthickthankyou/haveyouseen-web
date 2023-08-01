import { InputType, PickType } from '@nestjs/graphql'
import { Location } from '../entities/location.entity'

@InputType()
export class CreateLocationInput extends PickType(
  Location,
  ['address', 'latitude', 'longitude'],
  InputType,
) {}
