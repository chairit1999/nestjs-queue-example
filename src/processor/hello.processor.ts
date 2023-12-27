import { QueueEnum } from '@enum/queue.enum';
import { Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
import { AppService } from 'src/app.service';
export interface HelloInterFace {
  text: string;
}

@Processor(QueueEnum.HELLO)
export class HelloProcessor {
  constructor(private appService: AppService) {}

  @Process()
  async handle(job: Job<HelloInterFace>, done: DoneCallback) {
    const { text } = job.data;
    try {
      const result = this.appService.getHello(text);
      console.log(text);

      done(null, result);
    } catch (error) {
      done(error);
    }
  }
}
