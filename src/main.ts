import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
const cookieParser = require('cookie-parser');
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { log, warn } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //@ts-ignore
  app.use(cookieParser());
  const configService = app.get(ConfigService);

  const whitelist = [
    'https://shiba-shipping.netlify.app',
    'https://shiba-crm-backend.vercel.app',
    'https://shibacrmbackend.onrender.com',
    'https://shiba-app.onrender.com',
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        log(`cors success; origin: ${origin}`);
        callback(null, true);
      } else {
        warn(`cors failure; origin: ${origin}`);
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
  await app.listen(port, () => {
    console.log(
      `ENV="${configService.get(
        'NODE_ENV',
      )}", Server started on port = ${port}, url=${
        process.env.RENDER_EXTERNAL_HOSTNAME
      }`,
    );
  });
}
bootstrap();
