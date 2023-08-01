import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { Role } from 'src/common/types'
import { AuthGuard } from 'src/common/guards/auth/auth.guard'

export const AllowAuthenticated = (...roles: Role[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard))

export const AllowAuthenticatedOptional = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata('allowUnauthenticated', true),
    SetMetadata('roles', roles),
    UseGuards(AuthGuard),
  )

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx)
    const user = context.getContext().req.user
    return user
  },
)
