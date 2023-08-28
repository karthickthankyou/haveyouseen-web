import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { WitnessesModule } from './models/witnesses/witnesses.module'
import { ApprovedReportsModule } from './models/approved-reports/approved-reports.module'
import { CasesModule } from './models/cases/cases.module'
import { LocationsModule } from './models/locations/locations.module'
import { MissingPeopleModule } from './models/missing-people/missing-people.module'
import { OfficersModule } from './models/officers/officers.module'
import { ReportsModule } from './models/reports/reports.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { FirebaseModule } from './common/firebase/firebase.module'
import { AuthModule } from './common/auth/auth.module'
import { CommentsModule } from './models/comments/comments.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      introspection: true,
    }),

    PrismaModule,
    FirebaseModule,
    AuthModule,

    WitnessesModule,
    ApprovedReportsModule,
    CasesModule,
    LocationsModule,
    MissingPeopleModule,
    OfficersModule,
    ReportsModule,

    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
