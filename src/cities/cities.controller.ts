import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiQuery({
    name: 'country',
    type: 'string',
    required: true,
    description: 'country that you want to see the cities',
  })
  @ApiQuery({
    name: 'searchString',
    type: 'string',
    required: false,
    description: 'search by the first characters of a country name',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: true,
    description: 'use the response to handle pagination',
  })
  findByCountry(
    @Query('country') country: string,
    @Query('page') page: number,
    @Query('searchString') searchString?: string,
  ) {
    return this.citiesService.findByCountry(country, +page, searchString);
  }
}
