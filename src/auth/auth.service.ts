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
    const { email, password, name } = createAuthDto;

    // 1️⃣ Check if user exists
    const existingUser = await this.userService.getUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already taken');
    }
    const newUser = await this.userService.createUser(createAuthDto);

    this.logger.log(`New User has been created ${newUser.id}`);
    return { message: 'User created successfully.', data: newUser };
  }

  async login(loginDto: LoginAuthDto) {
    /**
     * 1. Get User(X)
     * 2. compare password (X)
     * 3. create generate token
     * 4. return jwt token
     */
    const { email, password } = loginDto;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email or Password is incorrect.');
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new UnauthorizedException('Email or Password is incorrect.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(payload);

    const userpayload = {
      message: "User created Succesfully.",
      user, access_token

    };

    return userpayload;
  }
}
