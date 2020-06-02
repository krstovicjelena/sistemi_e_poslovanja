import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  /*
  pipe su odredjeni mehanizmi koji nemaju veze sa req i res vec je vezan za proces kreiranja objekata 
  dakle za rad sa elementima koje nasa aplikacija kreira i ceo proces validacije treba da bude postavljen ovde
  */
  app.useGlobalPipes(new ValidationPipe());


  await app.listen(3000);

}


bootstrap();
