import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setOpenApiSwagger = (app: NestExpressApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Swagger')
    .setVersion('beta')
    .addBearerAuth({ in: 'headers', type: 'http', name: 'accessToken' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
