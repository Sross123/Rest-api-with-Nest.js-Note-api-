import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async getUserByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async createUser(createAuthDto: CreateAuthDto) {
        const { email, name, password } = createAuthDto;

        // Hash password with salt rounds
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                password: hashPassword,
            },
        });

        const { password: _, ...safeUser } = user;
        return safeUser;
    }
}
