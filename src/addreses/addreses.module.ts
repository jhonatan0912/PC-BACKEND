import { Module } from '@nestjs/common';
import { AddresesService } from './addreses.service';
import { AddresesController } from './addreses.controller';
import { DistrictsModule } from './districts/districts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { AuthorizationMiddleware } from 'src/authorization.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    DistrictsModule,
  ],
  controllers: [AddresesController],
  providers: [AddresesService, AuthorizationMiddleware],
  exports: []
})
export class AddresesModule { }
