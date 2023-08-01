import { Module } from '@nestjs/common'
import { CasesService } from './cases.service'
import { CasesResolver } from './cases.resolver'

@Module({
  providers: [CasesResolver, CasesService],
  exports: [CasesService],
})
export class CasesModule {}
