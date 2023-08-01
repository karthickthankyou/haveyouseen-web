import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { LocationsService } from './locations.service'
import { Location } from './entities/location.entity'
import { FindManyLocationArgs, FindUniqueLocationArgs } from './dto/find.args'
import { CreateLocationInput } from './dto/create-location.input'
import { UpdateLocationInput } from './dto/update-location.input'

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

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

  @Mutation(() => Location)
  updateLocation(@Args('updateLocationInput') args: UpdateLocationInput) {
    return this.locationsService.update(args)
  }

  @Mutation(() => Location)
  removeLocation(@Args() args: FindUniqueLocationArgs) {
    return this.locationsService.remove(args)
  }
}
