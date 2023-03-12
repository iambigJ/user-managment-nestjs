import { Body, Controller, Post } from "@nestjs/common";
import { loginDto, signupDto } from "./dto";
import { AuthService } from "./auth.service";



@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: signupDto) {
        return this.authService.signup(dto)
    }

    @Post('login')
    login(@Body() dto: loginDto) {
        return this.authService.login(dto)
    }
}