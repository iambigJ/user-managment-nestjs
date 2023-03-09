import { Global, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Global()
@Module({
  providers: [MessagesService]
})
export class MessagesModule { }
