import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Role } from 'src/common/types'

@InputType()
export class LoginInput {
  @Field()
  email: string
  @Field()
  password: string
}

@ObjectType()
export class LoginOutput {
  @Field()
  kind: string
  @Field()
  localId: string
  @Field()
  email: string
  @Field()
  displayName: string
  @Field()
  idToken: string
  @Field()
  refreshToken: string
  @Field()
  expiresIn: string
}

@InputType()
export class RegisterInput {
  @Field()
  email: string
  @Field()
  password: string
  @Field()
  displayName?: string
}

@ObjectType()
export class RegisterOutput extends LoginOutput {}

@InputType()
export class RefreshTokenInput {
  @Field()
  refresh_token: string
}

@ObjectType()
export class RefreshTokenOutput {
  @Field()
  access_token: string
  @Field()
  expires_in: string
  @Field()
  token_type: string
  @Field()
  refresh_token: string
  @Field()
  id_token: string
  @Field()
  user_id: string
  @Field()
  project_id: string
}

export enum RoleEnum {
  'admin' = 'admin',
  'manager' = 'manager',
}

registerEnumType(RoleEnum, { name: 'RoleEnum', description: 'Enum for roles' })

@InputType()
export class SetRoleInput {
  @Field(() => String)
  uid: string
  @Field(() => RoleEnum)
  role: Role
}
