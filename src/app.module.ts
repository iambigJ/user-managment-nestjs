import { Module } from '@nestjs/common';
import { AuthModule } from './auth/user.module';
import { UserUrlsModule } from './user-urls/user-urls.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ErrorMessagesModule } from './error-messages/error-messages.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserUrlsModule, PrismaModule, ErrorMessagesModule],
})
export class AppModule { }
