import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async register(createAuthDto: CreateAuthDto) {
    const { email } = createAuthDto;

    // Check if user already exists
    const existingUser = await this.userService.getUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already taken');
    }

    const newUser = await this.userService.createUser(createAuthDto);
    this.logger.log(`New user created: ${newUser.id}`);

    return {
      message: 'User registered successfully.',
      data: newUser,
    };
  }

  async login(loginDto: LoginAuthDto) {
    const { email, password } = loginDto;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const { password: _, ...safeUser } = user;

    return {
      message: 'Login successful.',
      data: {
        user: safeUser,
        accessToken,
      },
    };
  }
}
