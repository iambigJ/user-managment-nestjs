import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategy/auth.strategy';
import { AuthController } from './user.controller';
import { AuthService } from './user.service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, PrismaService, MessagesService]
})
export class AuthModule {
    constructor() { }
}
