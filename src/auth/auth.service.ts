import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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

      const userId = newUser.id;

      const jwtPayload = { userId, names, email };
      const secretKey = 'chinese-palace-app';
      const token = jwt.sign(jwtPayload, secretKey, { expiresIn: '6h' });

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

      const jwtPayload = { userId: user.id, names: user.names, email: user.email };
      const secretKey = 'chinese-palace-app';
      const token = jwt.sign(jwtPayload, secretKey, { expiresIn: '6h' });

      return { token };
    } catch (error) {
      return new Error(error.message || 'Internal server error');
    }
  }
}
