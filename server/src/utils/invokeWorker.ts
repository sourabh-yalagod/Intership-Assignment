import { Worker } from "bullmq";
import Redis from "ioredis";
import { sendMail } from "../services/mail";
import { Task } from "../model/task.model";
const redisClient = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});
export const invokeWorker = () => {
  const worker = new Worker(
    "schedule-task",
    async (job: any): Promise<any> => {},
    { connection: redisClient }
  );
  worker.on("completed", async (job: any) => {
    await sendMail(job.data);
    const task = await Task.findOne({
      message: job.data.message,
      userId: job.data.userId,
      scheduledTime: job.data.scheduledTime,
    });
    console.log(task, job.data);

    if (task) {
      task.status = true;
      console.log("task", task);

      await task.save();
    }
  });
};
