import { Module } from '@nestjs/common'
import { WitnessesService } from './witnesses.service'
import { WitnessesResolver } from './witnesses.resolver'

@Module({
  providers: [WitnessesResolver, WitnessesService],
  exports: [WitnessesService],
})
export class WitnessesModule {}
