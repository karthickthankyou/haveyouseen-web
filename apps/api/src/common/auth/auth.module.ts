import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'

@Global()
@Module({
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
