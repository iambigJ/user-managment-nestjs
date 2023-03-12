import { IsNumberString, IsString } from "class-validator";

export class userUpdateDto {
    @IsString()
    name: string

    @IsString()
    lastName: string

    @IsNumberString()
    telephone: string

}