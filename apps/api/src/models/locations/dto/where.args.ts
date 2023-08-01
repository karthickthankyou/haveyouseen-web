import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ReportListRelationFilter } from 'src/models/reports/dto/where.args'

@InputType()
export class LocationWhereUniqueInput {
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class LocationWhereInput
  implements RestrictProperties<LocationWhereInput, Prisma.LocationWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => FloatFilter, { nullable: true })
  latitude: FloatFilter
  @Field(() => FloatFilter, { nullable: true })
  longitude: Prisma.FloatFilter
  @Field(() => StringFilter, { nullable: true })
  address: StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => ReportListRelationFilter, { nullable: true })
  reports: ReportListRelationFilter
  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [LocationWhereInput], { nullable: true })
  AND: LocationWhereInput[]
  @Field(() => [LocationWhereInput], { nullable: true })
  OR: LocationWhereInput[]
  @Field(() => [LocationWhereInput], { nullable: true })
  NOT: LocationWhereInput[]
}

@InputType()
export class LocationListRelationFilter {
  @Field(() => LocationWhereInput, { nullable: true })
  every: LocationWhereInput
  @Field(() => LocationWhereInput, { nullable: true })
  some: LocationWhereInput
  @Field(() => LocationWhereInput, { nullable: true })
  none: LocationWhereInput
}

@InputType()
export class LocationRelationFilter {
  @Field(() => LocationWhereInput, { nullable: true })
  is: LocationWhereInput
  @Field(() => LocationWhereInput, { nullable: true })
  isNot: LocationWhereInput
}
