import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { FirebaseService } from 'src/common/firebase/firebase.service'
import { Role } from 'src/common/types'

const authorizeUsingAccesstoken = async (
  accessToken: string,
  firebaseService: FirebaseService,
) => {
  if (!accessToken) {
    return null
  }

  try {
    const data = await firebaseService.getAuth().verifyIdToken(accessToken)

    const userData = await firebaseService
      .getAuth()
      .getUser(data.uid)
      .then((userRecord) => userRecord)

    const { uid, displayName } = userData
    console.log('uid , displayname, roles ', uid, displayName, data.roles)
    return { uid, displayName, roles: data.roles }
  } catch (error) {
    console.error('AuthMiddleware error: ', error)

    return null
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly firebaseService: FirebaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    const bearerHeader = req.headers.authorization
    const accessToken = bearerHeader && bearerHeader.split(' ')[1]

    const user = await authorizeUsingAccesstoken(
      accessToken,
      this.firebaseService,
    )

    const allowUnauthenticated = this.reflector.getAllAndOverride<boolean>(
      'allowUnauthenticated',
      [context.getHandler(), context.getClass()],
    )

    if (!user && !allowUnauthenticated) {
      throw new UnauthorizedException()
    }
    req.user = user

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    if (requiredRoles.length === 0) {
      return true
    }

    return requiredRoles.some((role) => req.user?.roles?.includes(role))
  }
}
