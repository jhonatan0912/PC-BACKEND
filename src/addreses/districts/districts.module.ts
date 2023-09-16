import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { Address } from '../entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([District, Address])],
  controllers: [DistrictsController],
  providers: [
    DistrictsService,
  ],
  exports: [DistrictsService]
})
export class DistrictsModule { }
