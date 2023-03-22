import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Private notes app')
    .setDescription('A resAPI with a login, bearer auth and private notes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({ origin: ['http://localhost:3000', process.env.FRONTURI], credentials: true });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
