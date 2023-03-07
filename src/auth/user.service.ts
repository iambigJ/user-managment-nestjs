import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginDto, signupDto } from './dto';
import * as bcrypt from "bcrypt"
import { ConfigService } from '@nestjs/config';
import { ErrorMessagesService } from 'src/error-messages/error-messages.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class AuthService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService,
        private errorMessage: ErrorMessagesService,
        private jwt: JwtService) { }


    async signup(data: signupDto) {

        try {
            const pwHash = await bcrypt.hash(data.password, Number(this.config.get("BCRYPT_SALT")))
            data.password = pwHash

            const user = await this.prisma.user.create({ data })
            return user
        } catch (error) {
            if (error.code === "P2002") throw new ForbiddenException(this.errorMessage.credentialsError())
            throw error
        }
    }
    async login(data: loginDto) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email: data.email } })

            if (!user) {
                throw new BadRequestException(this.errorMessage.passwordOrEmailWereWrong())
            }

            const pwCompare = await bcrypt.compare(data.password, user.password)
            if (!pwCompare) {
                throw new BadRequestException(this.errorMessage.passwordOrEmailWereWrong())
            }
            return await this.#signToken(user.id, user.email)

        } catch (error) {
            if (error.code === "P2002") throw new ForbiddenException(this.errorMessage.credentialsError())
            throw error
        }
    }
    async #signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const token = await this.jwt.signAsync(payload, { secret: this.config.get("JWT_SECRET"), expiresIn: this.config.get("JWT_EXPIRE") })
        return {
            access_token: token
        }
    }
}
