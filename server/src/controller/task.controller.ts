import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { addTaskZod } from "../utils/zodParser";
import { Task } from "../model/task.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { handleScheduler } from "../utils/scheduler";

const addTask = asyncHandler(async (req: Request, res: Response) => {
  const { success, data, error } = addTaskZod.safeParse(req.body);
  if (!success) {
    throw new ApiError(401, error?.message || "Error while creating Task");
  }
  try {
    const delay = new Date(data.scheduledTime).getTime() - Date.now();
    if (delay < 0) {
      throw new ApiError(400, "Scheduled time must be in the future.");
    }
    await Task.create(data);
    await handleScheduler(data);
    res.json(new ApiResponse(201, "Done", {}));
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Error while creating Task");
  }
});
const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(req.params);
  try {
    const tasks = await Task.find({ userId });
    res.json(
      new ApiResponse(202, `tasks fetched for user ${userId}`, { tasks })
    );
  } catch (error: any) {
    throw new ApiError(502, error.message || "Tasks fetching failed");
  }
});
export { addTask, getTasks };
