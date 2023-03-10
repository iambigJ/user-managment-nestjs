import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { isAdmin } from './guard';



@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, MessagesService]
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAdmin)
      .forRoutes(AdminController)
  }
}

