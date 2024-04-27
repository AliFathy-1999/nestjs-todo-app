import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from './config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/httpException.filter';

const { 
  app : { port } 
} = Config

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  // Cors
  app.enableCors();
  // Versioning API
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  // Not allowed to enter field didn't exist in dto whitelist: true && forbidNonWhitelisted:true throw error (This field doesn't exist)
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true,
      forbidNonWhitelisted:true,
      stopAtFirstError: true
    })
  );

  const config = new DocumentBuilder()
  .setTitle('Nest Mongoose TODOCRUD ')
  .setDescription('The User API description')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
