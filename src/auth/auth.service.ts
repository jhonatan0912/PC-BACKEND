import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async register({ names, email, password }) {
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
      })

      await this.userRepository.save(newUser);

      const jwtPayload = { names, email };
      const secretKey = 'chinese-palace-app';
      const token = jwt.sign(jwtPayload, secretKey, { expiresIn: '1h' });

      return token;

    } catch (error) {
      throw new Error(error.message || 'Error in server');
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        return { error: 'Correo electrónico no encontrado' };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { error: 'Contraseña incorrecta' };
      }

      const jwtPayload = { names: user.names, email: user.email };
      const secretKey = 'chinese-palace-app';
      const token = jwt.sign(jwtPayload, secretKey, { expiresIn: '1h' });

      return { token };
    } catch (error) {
      console.error('Error:', error);
      return { error: 'Error en el servidor' };
    }
  }
}
