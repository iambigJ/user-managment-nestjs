import { Transform } from "class-transformer"
import { IsNotEmpty, IsObject, IsString } from "class-validator"


export class formDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.toLowerCase().trim())
    domain: string

    @IsObject()
    @IsNotEmpty()
    signupFields: object
}