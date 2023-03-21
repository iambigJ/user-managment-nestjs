import { Module } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserUrlsController } from './form-urls.controller';
import { UserUrlsService } from './form-urls.service';

@Module({
  controllers: [UserUrlsController],
  providers: [UserUrlsService, PrismaService, MessagesService]
})
export class FormUrlsModule { }
