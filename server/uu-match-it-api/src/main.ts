import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Povolení CORS pro frontend běžící na portu 3001
  app.enableCors({
    origin: 'http://localhost:3001', // Povoluje požadavky z vašeho frontendu
    methods: 'GET,POST,PUT,DELETE', // Povoluje pouze tyto metody
    credentials: true, // Povoluje přesouvání credentials (cookies, autorizační hlavičky atd.)
  });

  await app.listen(3000);
}
bootstrap();
