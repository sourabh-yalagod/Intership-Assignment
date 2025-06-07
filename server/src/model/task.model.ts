import mongoose from "mongoose";
const scheduleTaskSchema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: String,
    },
    message: {
      required: true,
      type: String,
    },
    deliveryMethod: {
      enum: ["sms", "email"],
      type: String,
      default: "email",
    },
    scheduledTime: {
      required: true,
      type: String,
    },
    status: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Task =
  mongoose?.models?.tasks || mongoose.model("tasks", scheduleTaskSchema);
export { Task };
