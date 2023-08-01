import { Module } from '@nestjs/common'
import { MissingPeopleService } from './missing-people.service'
import { MissingPeopleResolver } from './missing-people.resolver'

@Module({
  providers: [MissingPeopleResolver, MissingPeopleService],
  exports: [MissingPeopleService],
})
export class MissingPeopleModule {}
