import { Module } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { ReportsResolver } from './reports.resolver'

@Module({
  providers: [ReportsResolver, ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
