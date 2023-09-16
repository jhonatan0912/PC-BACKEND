import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAdressDto extends PartialType(CreateAddressDto) { }