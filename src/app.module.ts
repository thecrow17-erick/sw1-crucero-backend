import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, EnvSchema } from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvSchema,
      load: [EnvConfig]
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
