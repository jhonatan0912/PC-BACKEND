import { IsNotEmpty } from "class-validator";

export class CreateProductDto {

  id?: number;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  category: string;
}