import { scheduleQueue } from "..";
import { ScheduleTaskPayload } from "../types";

export const handleScheduler = async (
  scheduleTaskPayload: ScheduleTaskPayload
) => {
  await scheduleQueue.add("schedule-task", scheduleTaskPayload, {
    delay:
      new Date(scheduleTaskPayload?.scheduledTime).getTime() -
      new Date().getTime(),
    // delay: 0,
    attempts: 3,
  });
};
