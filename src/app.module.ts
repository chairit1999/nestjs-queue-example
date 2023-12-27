import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigModule as ConfigENV } from './config/config.module';
import { HelloProcessor } from './processor/hello.processor';

const registerQueue = () => {
  return BullModule.registerQueue({
    name: 'Hello',
    defaultJobOptions: {
      timeout: 30 * 60 * 1000, // 30 min
      removeOnFail: true,
      removeOnComplete: {
        age: 10 * 1000,
        count: 10,
      },
    },
  });
};

@Module({
  imports: [
    ConfigENV,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get('REDIS_QUEUE_HOST'),
            port: configService.get<number>('REDIS_QUEUE_PORT'),
          },
        };
      },
      inject: [ConfigService],
    }),
    registerQueue(),
  ],
  controllers: [AppController],
  providers: [AppService, HelloProcessor],
})
export class AppModule {}
