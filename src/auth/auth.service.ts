import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async register(createUserDto: CreateUserDto) {

    const { names, email, password } = createUserDto;

    try {
      const existingUser = await this.userRepository.findOne({ where: { email } });

      if (existingUser) {
        throw new ConflictException(`User ${existingUser.email} already exists`);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.userRepository.create({
        names,
        email,
        password: hashedPassword
      });

      await this.userRepository.save(newUser);

      const token = await this.generateToken(newUser);

      const { password: _, ...rest } = newUser

      return {
        ...rest,
        token
      };
    } catch (error) {
      return { error: error.message || 'Internal server error' };
    }
  }


  async login(loginDto: LoginDto) {

    const { email, password } = loginDto;

    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        return { error: 'Email not found' };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { error: 'Incorrect password' };
      }

      const token = await this.generateToken(user);

      return {
        email: user.email,
        token
      };
    } catch (error) {
      return new Error(error.message || 'Internal server error');
    }
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async profile({ email, role }: { email: string, role: string }) {

    const user = await this.userRepository.findOne({ where: { email } });

    const { password: _, ...rest } = user;

    return { ...rest }
  }
}
