import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(private readonly userService: UserService) { }

  async create(createAuthDto: CreateAuthDto) {
    const { email, password, name } = createAuthDto;

    // 1️⃣ Check if user exists
    const existingUser = await this.userService.getUserByEmail(email)

    if (existingUser) {
      throw new ConflictException('Email already taken');
    }
    const newUser = await this.userService.createUser(createAuthDto);

    this.logger.log(`New User has been created ${newUser.id}`)
    return { message: "User created successfully.", data: newUser }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
