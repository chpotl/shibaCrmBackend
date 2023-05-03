import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
const cookieParser = require('cookie-parser');
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cors from 'cors';
import helmet from 'helmet';
import { CustomExceptionsFilter } from './utils/global-error-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new CustomExceptionsFilter());

  //@ts-ignore
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  const origin = configService.get('ORIGIN');
  const whitelist = [
    'https://shiba-shipping.netlify.app',
    'http://localhost:3000',
  ];
  app.enableCors({
    origin: function (origin, callback) {
      console.log('cors orgin', origin);
      if (!origin || whitelist.indexOf(origin) !== -1) {
        console.log('cors success', origin);
        callback(null, true);
      } else {
        console.log('cors failure');
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  const port = configService.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('Shiba CRM api')
    .setDescription('Api for SHiba CRM')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document, {
    // customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });
  await app.listen(port);
}
bootstrap();
