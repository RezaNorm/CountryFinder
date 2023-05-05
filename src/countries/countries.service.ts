import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from './schema/country.schema';
import { Model } from 'mongoose';


@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
  ) {}

  async findAll(searchString: string = ``, page: number = 1) {
    const limit = 30;

    const total = await this.countryModel.countDocuments({
      name: { $regex: '^' + searchString },
    });

    const data = await this.countryModel.find(
      {
        name: { $regex: '^' + searchString },
      },
      'name',
      { skip: (page - 1) * limit, limit },
    );

    const result = {
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / limit),
      },
    };
    return result;
  }
}
