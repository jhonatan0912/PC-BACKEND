import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AddresesService } from './addreses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAdressDto } from './dto/update-address.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('addreses')
export class AddresesController {

  constructor(private readonly addresesService: AddresesService) { }

  @Post()
  create(@Body() createAddreseDto: CreateAddressDto) {
    return this.addresesService.create(createAddreseDto);
  }

  @Get('user/:userId')
  async findAll(@Param('userId') userId: number) {
    return this.addresesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addresesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddreseDto: UpdateAdressDto) {
    return this.addresesService.update(+id, updateAddreseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addresesService.remove(+id);
  }
}
