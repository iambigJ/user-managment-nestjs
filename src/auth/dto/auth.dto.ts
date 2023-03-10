import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator"


export class signupDto {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @Transform(({ value }) => value?.toLowerCase().trim())
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    @Transform(({ value }) => {
        value = value?.toLowerCase().trim()
        return value
    })
    @Length(3, 12)
    name: string

    @IsString()
    @Length(3, 12)
    @Transform(({ value }) => {
        value = value?.toLowerCase().trim()
        return value
    })
    lastName: string

    @IsNumberString()
    telephone: string
}

export class loginDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value?.toLowerCase().trim())
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}