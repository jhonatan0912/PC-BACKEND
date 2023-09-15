import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() newUser: CreateUserDto, @Res() res: Response) {

    try {

      const token = await this.authService.register(newUser);
      res.json({ token });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error';
      res.status(500).json({ error: errorMessage });
    }
  }

  @Post('login')
  async login(@Body() user: LoginDto) {

    return this.authService.login(user);
  }
}
