import { z } from "zod";

export const addTaskZod = z.object({
  userId: z.string(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  deliveryMethod: z.enum(["sms", "email"]).default("email"),
  scheduledTime: z.string(),
  message: z.string(),
});
