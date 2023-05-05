import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { City } from '../../cities/schema/city.schema';

export type CountryDocument = HydratedDocument<Country>;

@Schema()
export class Country {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  cities: City[];
}

export const CountrySchema = SchemaFactory.createForClass(Country); 
