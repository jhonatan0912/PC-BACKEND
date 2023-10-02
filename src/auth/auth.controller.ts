import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() newUser: CreateUserDto) {

    return await this.authService.register(newUser);
    
  }

  @Post('login')
  async login(@Body() user: LoginDto) {

    return await this.authService.login(user);

  }
}
