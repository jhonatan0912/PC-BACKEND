import { Module } from '@nestjs/common';
import { AddresesService } from './addreses.service';
import { AddresesController } from './addreses.controller';
import { DistrictsModule } from './districts/districts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    DistrictsModule,
  ],
  controllers: [AddresesController],
  providers: [AddresesService],
  exports: []
})
export class AddresesModule { }
