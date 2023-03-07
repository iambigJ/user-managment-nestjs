import { Global, Module } from '@nestjs/common';
import { ErrorMessagesService } from './error-messages.service';

@Global()
@Module({
  providers: [ErrorMessagesService]
})
export class ErrorMessagesModule { }
