import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  ApiQuery,
} from '@nestjs/swagger';
import { Query } from '@nestjs/common/decorators';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: true,
    description: 'use the response to handle pagination',
  })
  @ApiQuery({
    name: 'searchString',
    type: 'string',
    required: false,
    description: 'search by the first characters of a country name',
  })
  findAll(
    @Query('page') page: number,
    @Query('searchString') searchString?: string,
  ) {
    return this.countriesService.findAll(searchString, +page);
  }
}
