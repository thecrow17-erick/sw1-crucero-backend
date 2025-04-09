import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CORS } from './constant';

async function bootstrap() {
  const port = +process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }  
    })
  );
  app.enableCors(CORS);
  app.setGlobalPrefix("api");
  await app.listen(port, ()=>{
    Logger.log(`Server on port ${port}`);
  });
}
bootstrap();
