import { Module } from '@nestjs/common';
import { ErrorMessagesService } from 'src/error-messages/error-messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserUrlsController } from './user-urls.controller';
import { UserUrlsService } from './user-urls.service';

@Module({
  controllers: [UserUrlsController],
  providers: [UserUrlsService, PrismaService, ErrorMessagesService]
})
export class UserUrlsModule { }
