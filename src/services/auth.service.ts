import { User } from '../entities/User';
import { AppDataSource } from '../config/database';
import * as bcryptjs from 'bcryptjs';
import { TokenService } from './token.service';
import { ValidationError } from '../utils/errors';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private tokenService = new TokenService();

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'name', 'role', 'isActive']
    });

    if (!user || !user.isActive) {
      throw new ValidationError('Invalid credentials');
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      throw new ValidationError('Invalid credentials');
    }

    return user;
  }

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email }
    });

    if (existingUser) {
      throw new ValidationError('Email already exists');
    }

    const hashedPassword = await bcryptjs.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    return this.userRepository.save(user);
  }
}