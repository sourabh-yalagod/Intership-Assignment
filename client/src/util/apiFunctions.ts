import axios from "axios";
interface TaskPayload {
  scheduledTime: Date | any;
  message: string;
  userId: string;
  deliveryMethod: string;
  email?: string;
  phoneNumber?: string;
}
export const createTask = async (payload: TaskPayload) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/scheduletask",
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getTasks = async (userId: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/scheduletask/${userId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
