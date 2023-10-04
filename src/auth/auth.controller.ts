import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';

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

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  profile(
    @Request()
    req: any
  ) {
    return req.user;
  }
}
