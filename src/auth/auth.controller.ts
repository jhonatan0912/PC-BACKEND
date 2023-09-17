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
  async login(@Body() user: LoginDto, @Res() res: Response) {

    try {
      const token = await this.authService.login(user);
      res.json({
        email: user.email,
        token: token
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error';
      res.status(500).json({ error: errorMessage });
    }
  }
}
