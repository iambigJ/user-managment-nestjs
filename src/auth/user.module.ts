import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ErrorMessagesService } from 'src/error-messages/error-messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './user.controller';
import { AuthService } from './user.service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, ErrorMessagesService]
})
export class AuthModule {
    constructor() { }
}
