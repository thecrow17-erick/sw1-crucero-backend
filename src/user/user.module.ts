import { Module } from '@nestjs/common';
import { UserService } from './service';
import { PrismaModule } from 'src/prisma';
import { UserController } from './controller/user.controller';

@Module({
  providers: [UserService],
  imports: [
    PrismaModule
  ],
  controllers: [UserController],
  exports: [
    UserService
  ]
})
export class UserModule {}
