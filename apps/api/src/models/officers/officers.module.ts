import { Module } from '@nestjs/common'
import { OfficersService } from './officers.service'
import { OfficersResolver } from './officers.resolver'

@Module({
  providers: [OfficersResolver, OfficersService],
  exports: [OfficersService],
})
export class OfficersModule {}
