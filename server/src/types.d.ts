interface ScheduleTaskPayload {
  scheduledTime: Date | any;
  message: string;
  userId: string;
  deliveryMethod: string;
  email?: string;
  phoneNumber?: string;
}
export type { ScheduleTaskPayload };
