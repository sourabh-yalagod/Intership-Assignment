import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createTask, getTasks } from "../util/apiFunctions";
import { useUser } from "@clerk/clerk-react";
import TaskCard from "../components/TaskCard";

const Schedule = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("email");
  const { user } = useUser();
  const [time, setTime] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await createTask({
        message,
        deliveryMethod,
        scheduledTime: new Date(time),
        userId: user?.id as string,
        email,
        phoneNumber,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await getTasks(user?.id || "");
      return res;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-100 via-white to-yellow-100 text-gray-900 p-6">
      <section className="max-w-3xl mx-auto space-y-8 py-20">
        <h2 className="text-4xl font-bold text-center">Schedule a Message</h2>
        <p className="text-center text-gray-700 text-lg">
          Draft your message and select a future time to deliver it. Stay
          productive and organized.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
        >
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 min-h-[100px]"
          />
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
          <select
            onChange={(e) => setDeliveryMethod(e.target.value)}
            name="delivery"
            id="delivery"
          >
            <option value="sms">Sms</option>
            <option value="email">Email</option>
          </select>

          {deliveryMethod == "email" && (
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          )}
          {deliveryMethod == "sms" && (
            <input
              type="number"
              maxLength={10}
              minLength={10}
              value={phoneNumber}
              placeholder="SMS"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          )}
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Schedule
          </button>
        </form>
      </section>
      <section className="max-w-3xl mx-auto space-y-8">
        <ul>
          {data.data &&
            data?.data?.tasks?.map((task: any) => {
              return <TaskCard key={task._id} task={task} />;
            })}
        </ul>
        {!data && !isLoading && <div>NO tasks</div>}
      </section>
    </div>
  );
};

export default Schedule;
