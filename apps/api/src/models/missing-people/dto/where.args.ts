import { Field, InputType } from '@nestjs/graphql'
import { $Enums, Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
  StringListFilter,
} from 'src/common/dtos/common.input'
import { CaseRelationFilter } from 'src/models/cases/dto/where.args'

@InputType()
export class MissingPersonWhereUniqueInput {
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class EnumBodyTypeFilter {
  @Field(() => $Enums.BodyType, { nullable: true })
  equals?: $Enums.BodyType;
  @Field(() => [$Enums.BodyType], { nullable: true })
  in?: $Enums.BodyType[]
  @Field(() => [$Enums.BodyType], { nullable: true })
  notIn?: $Enums.BodyType[]
  @Field(() => $Enums.BodyType, { nullable: true })
  not?: $Enums.BodyType
}

@InputType()
export class EnumGenderFilter {
  @Field(() => $Enums.Gender, { nullable: true })
  equals?: $Enums.Gender;
  @Field(() => [$Enums.Gender], { nullable: true })
  in?: $Enums.Gender[]
  @Field(() => [$Enums.Gender], { nullable: true })
  notIn?: $Enums.Gender[]
  @Field(() => $Enums.Gender, { nullable: true })
  not?: $Enums.Gender
}

@InputType()
export class MissingPersonWhereInput
  implements
    RestrictProperties<MissingPersonWhereInput, Prisma.MissingPersonWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  displayName: StringFilter
  @Field(() => StringListFilter, { nullable: true })
  images: StringListFilter
  @Field(() => DateTimeFilter, { nullable: true })
  dob: DateTimeFilter
  @Field(() => EnumGenderFilter, { nullable: true })
  gender: EnumGenderFilter
  @Field(() => StringFilter, { nullable: true })
  description: StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  missingSince: DateTimeFilter
  @Field(() => FloatFilter, { nullable: true })
  height: FloatFilter
  @Field(() => FloatFilter, { nullable: true })
  weight: FloatFilter
  @Field(() => EnumBodyTypeFilter, { nullable: true })
  bodyType: EnumBodyTypeFilter
  @Field(() => CaseRelationFilter, { nullable: true })
  case: CaseRelationFilter

  @Field(() => [MissingPersonWhereInput], { nullable: true })
  AND: MissingPersonWhereInput[]
  @Field(() => [MissingPersonWhereInput], { nullable: true })
  OR: MissingPersonWhereInput[]
  @Field(() => [MissingPersonWhereInput], { nullable: true })
  NOT: MissingPersonWhereInput[]
}

@InputType()
export class MissingPersonListRelationFilter {
  @Field(() => MissingPersonWhereInput, { nullable: true })
  every: MissingPersonWhereInput
  @Field(() => MissingPersonWhereInput, { nullable: true })
  some: MissingPersonWhereInput
  @Field(() => MissingPersonWhereInput, { nullable: true })
  none: MissingPersonWhereInput
}

@InputType()
export class MissingPersonRelationFilter {
  @Field(() => MissingPersonWhereInput, { nullable: true })
  is: MissingPersonWhereInput
  @Field(() => MissingPersonWhereInput, { nullable: true })
  isNot: MissingPersonWhereInput
}
