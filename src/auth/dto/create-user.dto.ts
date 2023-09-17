import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  names: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}