import { Module } from '@nestjs/common';
import { AuthModule } from './auth/user.module';
import { FormUrlsModule } from './form-urls/form-urls.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, FormUrlsModule, PrismaModule, MessagesModule],
})
export class AppModule { }
