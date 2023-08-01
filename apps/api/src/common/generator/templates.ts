#!/usr/bin/env ts-node

import { Names } from './util'

// *module.ts
export const createModuleFile = (names: Names) => {
  const { capitalPlural, kebabPlural } = names

  const fileContent = `import { Module } from '@nestjs/common'
import { ${capitalPlural}Service } from './${kebabPlural}.service'
import { ${capitalPlural}Resolver } from './${kebabPlural}.resolver'

@Module({
  providers: [${capitalPlural}Resolver, ${capitalPlural}Service],
  exports: [${capitalPlural}Service],
})
export class ${capitalPlural}Module {}
`
  return fileContent
}

export const createResolverFile = (names: Names) => {
  const { capitalPlural, kebab, capital, camel, kebabPlural, camelPlural } =
    names
  const fileContent = `import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ${capitalPlural}Service } from './${kebabPlural}.service'
import { ${capital} } from './entities/${kebab}.entity'
import { FindMany${capital}Args, FindUnique${capital}Args } from './dto/find.args'
import { Create${capital}Input } from './dto/create-${kebab}.input'
import { Update${capital}Input } from './dto/update-${kebab}.input'

@Resolver(() => ${capital})
export class ${capitalPlural}Resolver {
  constructor(private readonly ${camelPlural}Service: ${capitalPlural}Service) {}

  @Mutation(() => ${capital})
  create${capital}(@Args('create${capital}Input') args: Create${capital}Input) {
    return this.${camelPlural}Service.create(args)
  }

  @Query(() => [${capital}], { name: '${camelPlural}' })
  findAll(@Args() args: FindMany${capital}Args) {
    return this.${camelPlural}Service.findAll(args)
  }

  @Query(() => ${capital}, { name: '${camel}' })
  findOne(@Args() args: FindUnique${capital}Args) {
    return this.${camelPlural}Service.findOne(args)
  }

  @Mutation(() => ${capital})
  update${capital}(@Args('update${capital}Input') args: Update${capital}Input) {
    return this.${camelPlural}Service.update(args)
  }

  @Mutation(() => ${capital})
  remove${capital}(@Args() args: FindUnique${capital}Args) {
    return this.${camelPlural}Service.remove(args)
  }
}
`

  return fileContent
}

export const createServiceFile = (names: Names) => {
  const { capitalPlural, capital, kebab, camel } = names
  const fileContent = `import { Injectable } from '@nestjs/common'
import { FindMany${capital}Args, FindUnique${capital}Args } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Create${capital}Input } from './dto/create-${kebab}.input'
import { Update${capital}Input } from './dto/update-${kebab}.input'

@Injectable()
export class ${capitalPlural}Service {
  constructor(private readonly prisma: PrismaService) {}
  create(create${capital}Input: Create${capital}Input) {
    return this.prisma.${camel}.create({
      data: create${capital}Input,
    })
  }

  findAll(args: FindMany${capital}Args) {
    return this.prisma.${camel}.findMany(args)
  }

  findOne(args: FindUnique${capital}Args) {
    return this.prisma.${camel}.findUnique(args)
  }

  update(update${capital}Input: Update${capital}Input) {
    const { id, ...data } = update${capital}Input
    return this.prisma.${camel}.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUnique${capital}Args) {
    return this.prisma.${camel}.delete(args)
  }
}
`
  return fileContent
}

// *dto/create-${lower}.input.ts
export const createInputDtoFile = (names: Names) => {
  const { kebab, capital } = names
  const fileContent = `import { InputType, PickType } from '@nestjs/graphql'
import { ${capital} } from '../entities/${kebab}.entity'

@InputType()
export class Create${capital}Input extends PickType(${capital},[],InputType) {}

`

  return fileContent
}

export const updateInputDtoFile = (names: Names) => {
  const { kebab, capital } = names
  const fileContent = `import { Create${capital}Input } from './create-${kebab}.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { ${capital} } from '@prisma/client'

@InputType()
export class Update${capital}Input extends PartialType(Create${capital}Input) {
  id: ${capital}['id']
}
`

  return fileContent
}

export const findInputDtoFile = (names: Names) => {
  const { capital } = names

  return `import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ${capital}OrderByWithRelationInput } from './orderBy.args'
import { ${capital}WhereInput, ${capital}WhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.${capital}ScalarFieldEnum, {
  name: '${capital}ScalarFieldEnum',
})

@ArgsType()
export class FindMany${capital}Args
  implements RestrictProperties<FindMany${capital}Args, Omit<Prisma.${capital}FindManyArgs, 'include' | 'select'>>
{
  @Field(() => ${capital}WhereInput, { nullable: true })
  where: ${capital}WhereInput
  @Field(() => [${capital}OrderByWithRelationInput], { nullable: true })
  orderBy: ${capital}OrderByWithRelationInput[]
  @Field(() => ${capital}WhereUniqueInput, { nullable: true })
  cursor: ${capital}WhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.${capital}ScalarFieldEnum], { nullable: true })
  distinct: Prisma.${capital}ScalarFieldEnum[]
}

@ArgsType()
export class FindUnique${capital}Args {
  @Field({ nullable: true })
  where: ${capital}WhereUniqueInput
}`
}

export const orderByInputDtoFile = (names: Names) => {
  const { capital } = names

  return `import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ${capital}OrderByWithRelationInput
  implements RestrictProperties<${capital}OrderByWithRelationInput, Prisma.${capital}OrderByWithRelationInput>
{
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class ${capital}OrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
`
}
export const whereInputDtoFile = (names: Names) => {
  const { capital } = names

  return `import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ${capital}WhereUniqueInput
  implements RestrictProperties<${capital}WhereUniqueInput, Prisma.${capital}WhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class ${capital}WhereInput implements RestrictProperties<${capital}WhereInput, Prisma.${capital}WhereInput> {
  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [${capital}WhereInput], { nullable: true })
  AND: ${capital}WhereInput[]
  @Field(() => [${capital}WhereInput], { nullable: true })
  OR: ${capital}WhereInput[]
  @Field(() => [${capital}WhereInput], { nullable: true })
  NOT: ${capital}WhereInput[]
}

@InputType()
export class ${capital}ListRelationFilter {
  @Field(() => ${capital}WhereInput, { nullable: true })
  every: ${capital}WhereInput
  @Field(() => ${capital}WhereInput, { nullable: true })
  some: ${capital}WhereInput
  @Field(() => ${capital}WhereInput, { nullable: true })
  none: ${capital}WhereInput
}

@InputType()
export class ${capital}RelationFilter {
  @Field(() => ${capital}WhereInput, { nullable: true })
  is: ${capital}WhereInput
  @Field(() => ${capital}WhereInput, { nullable: true })
  isNot: ${capital}WhereInput
}
`
}

export const createEntityFile = (names: Names) => {
  const { capital } = names

  return `import { ObjectType } from '@nestjs/graphql'
import { ${capital} as ${capital}Type } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class ${capital} implements RestrictProperties<${capital},${capital}Type> {
    // Todo fill all properties. To make it nullable add below.
    // @Field(() => String, { nullable: true })
}
`
}
