import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prismaClient: PrismaService) { }
    //
    async getUserByEmail(email: string) {
        return await this.prismaClient.user.findUnique({ where: { email } })
    }

    async createUser(createAuthDto: CreateAuthDto) {
        const { email, name, password } = createAuthDto;

        // hash password
        const saltedPassword = 10;
        const hashPassword = await bcrypt.hash(password, saltedPassword)

        // create user
        const user = await this.prismaClient.user.create({
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
