import { Module } from '@nestjs/common'
import { ApprovedReportsService } from './approved-reports.service'
import { ApprovedReportsResolver } from './approved-reports.resolver'

@Module({
  providers: [ApprovedReportsResolver, ApprovedReportsService],
  exports: [ApprovedReportsService],
})
export class ApprovedReportsModule {}
