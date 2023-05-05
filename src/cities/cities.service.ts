import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Country } from 'src/countries/schema/country.schema';
import { City } from './schema/city.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
    @InjectModel(City.name) private cityModel: Model<City>,
  ) {}

  async findByCountry(country: string, page: number = 1, searchString: string = ``) {
    const limit = 30;

    const inputCountry = await this.countryModel.findOne({
      name: country.trim().toLowerCase(),
    });

    console.log(inputCountry)

    const total = await this.cityModel.countDocuments({
      country: inputCountry._id,
      name: { $regex: '^' + searchString },
    });

    console.log(total)

    const data = await this.cityModel.find(
      {
        country: inputCountry._id,
        name: { $regex: '^' + searchString },
      },
      null,
      { skip: (page - 1) * limit, limit },
    );

    console.log(data)

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
