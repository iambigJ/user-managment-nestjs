import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { isAdmin } from './guard';
import { Auth } from './guard/auth.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';



@Module({
  controllers: [AdminController, UserController],
  providers: [AdminService, UserService, PrismaService, MessagesService]
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAdmin)
      .forRoutes(AdminController)
    consumer
      .apply(Auth)
      .forRoutes(UserController)
  }
}

