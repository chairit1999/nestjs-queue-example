import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000),
        REDIS_QUEUE_HOST: Joi.string().default('localhost'),
        REDIS_QUEUE_PORT: Joi.number().default(6379),
      }),
    }),
  ],
})
export class ConfigModule {}
