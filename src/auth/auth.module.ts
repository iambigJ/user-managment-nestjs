import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategy/auth.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUrlsController } from './url-users-auth.controller';
import { AuthUrlsService } from './url-users-auth.service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController, AuthUrlsController],
    providers: [AuthService, AuthUrlsService, JwtStrategy, PrismaService, MessagesService]
})
export class AuthModule {
    constructor() { }
}
