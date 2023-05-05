import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Country } from '../../countries/schema/country.schema';

export type CityDocument = HydratedDocument<City>;

@Schema()
export class City {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
  country: Country;
}

export const CitySchema = SchemaFactory.createForClass(City);
