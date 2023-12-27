import { Queue } from 'bull';
import * as expressBasicAuth from 'express-basic-auth';
import { QueueEnum } from '@enum/queue.enum';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { NestExpressApplication } from '@nestjs/platform-express';

const createQueue = (
  app: NestExpressApplication,
  name: string,
): BullAdapter => {
  return new BullAdapter(app.get<Queue>(`BullQueue_${name}`), {
    readOnlyMode: true,
  });
};

export const setBullBoard = (app: NestExpressApplication) => {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/api/bull-board');
  const queues = Object.values(QueueEnum);
  createBullBoard({
    queues: queues.map((item) => createQueue(app, item)),
    serverAdapter,
  });
  app.use(
    '/api/bull-board',
    expressBasicAuth({
      users: {
        user: 'password',
      },
      challenge: true,
    }),
    serverAdapter.getRouter(),
  );
};
