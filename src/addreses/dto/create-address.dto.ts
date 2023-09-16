import { IsNotEmpty, MinLength } from "class-validator";

export class CreateAddressDto {

  @IsNotEmpty()
  userId: number

  @IsNotEmpty()
  districtId: number

  @IsNotEmpty()
  street: string

  @IsNotEmpty()
  addressNumber: number

  @IsNotEmpty()
  @MinLength(9)
  phone: string

  reference: string;

}
