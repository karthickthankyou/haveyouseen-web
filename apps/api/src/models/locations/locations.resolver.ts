import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { LocationsService } from './locations.service'
import { Location } from './entities/location.entity'
import { FindManyLocationArgs, FindUniqueLocationArgs } from './dto/find.args'
import { CreateLocationInput } from './dto/create-location.input'
import { UpdateLocationInput } from './dto/update-location.input'
import { AllowAuthenticated } from 'src/common/decorators/auth/auth.decorator'
import { Report } from '../reports/entities/report.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Location)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Location)
  createLocation(@Args('createLocationInput') args: CreateLocationInput) {
    return this.locationsService.create(args)
  }

  @Query(() => [Location], { name: 'locations' })
  findAll(@Args() args: FindManyLocationArgs) {
    return this.locationsService.findAll(args)
  }

  @Query(() => Location, { name: 'location' })
  findOne(@Args() args: FindUniqueLocationArgs) {
    return this.locationsService.findOne(args)
  }
  @AllowAuthenticated()
  @Mutation(() => Location)
  updateLocation(@Args('updateLocationInput') args: UpdateLocationInput) {
    return this.locationsService.update(args)
  }
  @AllowAuthenticated()
  @Mutation(() => Location)
  removeLocation(@Args() args: FindUniqueLocationArgs) {
    return this.locationsService.remove(args)
  }

  @ResolveField(() => [Report])
  reports(@Parent() parent: Location) {
    return this.prisma.report.findMany({
      where: { locationId: { equals: parent.id } },
    })
  }
}
