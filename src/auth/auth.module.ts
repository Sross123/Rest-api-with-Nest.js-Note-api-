import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstraint } from './constant';

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: JwtConstraint.Secret,
    signOptions: { expiresIn: "60s" }
  }), PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
