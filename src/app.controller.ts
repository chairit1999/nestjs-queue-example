import { QueueEnum } from '@enum/queue.enum';
import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { HelloInterFace } from './processor/hello.processor';
import { SayHelloDto } from './dto/say-hello.dto';
import { checkStatusJob } from './util/check-status-job';

@Controller()
export class AppController {
  constructor(
    @InjectQueue(QueueEnum.HELLO)
    private helloQueue: Queue<HelloInterFace>,
  ) {}

  @Post('')
  async sayHello(@Body() sayHelloDto: SayHelloDto) {
    try {
      const job = await this.helloQueue.add({ text: sayHelloDto.text });

      await checkStatusJob(job);
    } catch (error) {
      throw error;
    }
  }
}
