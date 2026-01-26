import { IsNotEmpty, IsString } from "class-validator"

export class CreateNoteDto {
    @IsNotEmpty()
    @IsString()
    title: String

    @IsNotEmpty()
    content: String
}
