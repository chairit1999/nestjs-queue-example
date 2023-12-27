import { BadRequestException } from '@nestjs/common';
import { Job } from 'bull';

export const checkStatusJob = async <T = unknown>(job: Job<T>, sec = 30) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject('Timeout');
    }, sec * 1000);
    const interval = setInterval(async () => {
      const isFailed = await job.isFailed();
      const isCompleted = await job.isCompleted();

      if (isFailed) {
        clearInterval(interval);
        clearTimeout(timeout);
        reject(new BadRequestException(job.failedReason));
      }
      if (isCompleted) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve(job.data);
      }
    }, 1 * 1000);
  });
};
