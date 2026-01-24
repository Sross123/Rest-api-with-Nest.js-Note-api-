import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaClient: PrismaService){}
    getUserByEmail(createAuthDto: CreateAuthDto){
        const user = this.prismaClient.user.findUnique({where:{
            email: createAuthDto.email
        }})
    }
}
