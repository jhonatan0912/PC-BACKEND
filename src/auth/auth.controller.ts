import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Role } from "./enums/role.enum";

interface RequestWithUser extends Request {
  user: {
    email: string,
    role: string
  }
}

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
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  profile(
    @Req()
    req: RequestWithUser
  ) {
    return this.authService.profile(req.user);
  }
}
