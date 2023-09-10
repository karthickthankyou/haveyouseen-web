import axios from 'axios'
import * as admin from 'firebase-admin'

import { BadRequestException, Injectable } from '@nestjs/common'

import {
  LoginInput,
  LoginOutput,
  RefreshTokenInput,
  RefreshTokenOutput,
  RegisterInput,
} from './dto/auth.input'

import { GetUserType, Role } from '../../common/types'
import { FirebaseService } from 'src/common/firebase/firebase.service'

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async login(args: LoginInput) {
    const { email, password } = args
    console.log('axios.post: ', axios.post)
    try {
      const firebaseUser = await axios.post<LoginOutput>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.firebaseAPIKey}`,
        { email, password, returnSecureToken: true },
      )
      console.log('Login Data ', firebaseUser)

      return firebaseUser.data
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async refreshToken(args: RefreshTokenInput) {
    const { refresh_token } = args
    try {
      const firebaseUser = await axios.post<RefreshTokenOutput>(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.firebaseAPIKey}`,
        { grant_type: 'refresh_token', refresh_token, returnSecureToken: true },
      )
      console.log('Refresh token Data ', firebaseUser)
      return firebaseUser.data
    } catch (err) {
      throw new BadRequestException(err.response.data.error.message)
    }
  }
  async register(args: RegisterInput): Promise<admin.auth.UserRecord> {
    const { email, password, displayName } = args

    try {
      const firebaseUser = await this.firebaseService.getAuth().createUser({
        email,
        password,
        displayName,
      })

      console.log('firebaseUser', firebaseUser)
      return firebaseUser
    } catch (err) {
      console.error('Registration error:', err)
      throw new BadRequestException('Registration failed.')
    }
  }

  async setRole(user: GetUserType, role: Role): Promise<boolean> {
    const existingRoles = user.roles || []
    if (existingRoles.includes(role)) {
      console.error(`User already has this role. ${role}`)
      return false
    }

    const updatedRoles = [...existingRoles, role]
    console.log('user updatedRoles ', updatedRoles, user)

    try {
      await this.firebaseService.getAuth().setCustomUserClaims(user.uid, {
        roles: updatedRoles,
      })
      console.log(`Successfully set role`)
      return true
    } catch (err) {
      console.log('Error setting custom user claims', err)
      throw new Error('Could not set custom user claims')
    }
  }

  async removeRole(user: GetUserType, role: Role) {
    const existingRoles = user.roles || []

    if (!existingRoles.includes(role)) {
      throw new BadRequestException(`User does not have this role. ${role}`)
    }

    const updatedRoles = existingRoles.filter((r) => r !== role)

    await this.firebaseService
      .getAuth()
      .setCustomUserClaims(user.uid, {
        roles: updatedRoles,
      })
      .then((res) => {
        console.log(`Successfully set ${JSON.stringify(res)}`)
      })

    return { success: true }
  }

  //   setAuthCookies(res: any, user: LoginOutput) {
  //     res.cookie('authToken', user.idToken, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'lax',
  //       maxAge: Number(user.expiresIn) * 1000,
  //     })

  //     res.cookie('uid', user.localId, {
  //       httpOnly: false,
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'lax',
  //       maxAge: Number(user.expiresIn) * 1000,
  //     })
  //   }
}
