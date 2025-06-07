import express from "express";
import cors from "cors";
import { Queue } from "bullmq";
import redis from "ioredis";
import { globalErrorHandler, routeNotFound } from "./utils/ApiError";
const redisClient = new redis();
import { invokeWorker } from "./utils/invokeWorker";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
invokeWorker();
const scheduleQueue = new Queue("schedule-task", {
  connection: redisClient,
});

// Routes
import scheduletask from "./route/task.route";
import { connectDb } from "./utils/mongo";
app.use("/api/scheduletask", scheduletask);
connectDb();
// Globle Erorr handler
app.use(globalErrorHandler);
// invalid Route handler
app.use(routeNotFound);

// listening at PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
export { scheduleQueue };
