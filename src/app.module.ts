import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({ 
        uri: configService.get<string>('DATABASE_URI')
      }),
      inject: [ConfigService],
    }),
    CountriesModule,
    CitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
