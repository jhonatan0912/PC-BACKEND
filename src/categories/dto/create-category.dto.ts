import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {

  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  name: string;

}
