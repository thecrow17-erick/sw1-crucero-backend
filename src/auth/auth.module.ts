import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { PrismaModule } from 'src/prisma';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports:[
    PrismaModule,
    UserModule,
    JwtModule
  ],
  providers: [AuthService]
})
export class AuthModule {}
