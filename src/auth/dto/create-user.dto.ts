import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(1)
  names: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}