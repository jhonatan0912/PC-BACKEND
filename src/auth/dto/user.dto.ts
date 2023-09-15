import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

  id?: string;

  names: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class LoginDto {

  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  password: string;
}