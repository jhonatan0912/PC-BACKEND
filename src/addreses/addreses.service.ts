import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAdressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddresesService {

  constructor(@InjectRepository(Address) private addressRepository: Repository<Address>) { }

  async create(createAddreseDto: CreateAddressDto) {
    await this.addressRepository.save(createAddreseDto);
  }

  async findAll(userId: number) {
    return await this.addressRepository.findOne({ where: { userId } })

  }

  findOne(id: number) {
    return `This action returns a #${id} addrese`;
  }

  update(id: number, updateAddreseDto: UpdateAdressDto) {
    return `This action updates a #${id} addrese`;
  }

  remove(id: number) {
    return `This action removes a #${id} addrese`;
  }
}
