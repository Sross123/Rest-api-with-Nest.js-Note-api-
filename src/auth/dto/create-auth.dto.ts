import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export class CreateAuthDto {
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string
}
