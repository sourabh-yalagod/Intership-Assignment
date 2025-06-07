interface Task {
  message: string;
  createdAt: string;
  scheduledTime: string;
  deliveryMethod: string;
  status: boolean;
}

export default function TaskCard({ task }: { task: Task }) {
  console.log(task);

  const createdAt = new Date(task.createdAt);
  const scheduledAt = new Date(task.scheduledTime);
  const now = new Date();
  const remainingMs = scheduledAt.getTime() - now.getTime();
  const remaining =
    remainingMs > 0 ? `${Math.floor(remainingMs / 1000 / 60)} min` : "Sent";

  return (
    <li
      className={`p-6 rounded-xl hover:scale-105 cursor-pointer space-y-2 mb-5 shadow-sm border-[1px] hover:shadow-md transition ${
        task.status
          ? "bg-green-300 border-green-400 line-through"
          : "bg-slate-200 border-slate-300"
      }`}
    >
      <h3 className="text-lg font-semibold text-indigo-600">{task.message}</h3>
      <div className="mt-2 text-sm flex items-center justify-between text-gray-600 space-y-1">
        <p>
          <span className="font-medium text-gray-700">Created At:</span>{" "}
          {createdAt.toLocaleString()}
        </p>
        <p>
          <span className="font-medium text-gray-700">Scheduled:</span>{" "}
          {scheduledAt.toLocaleString()}
        </p>
        <p>
          <span className="font-medium text-gray-700">Remaining Time :</span>{" "}
          {remaining}
        </p>
      </div>
      <div className="mt-2 text-sm flex items-center justify-around text-gray-600 space-y-1">
        <p className="text-xl text-gray-700">Method : {task.deliveryMethod}</p>
        <p className="text-xl text-gray-700">
          Is Informed ? : {task?.status ? "Yes" : "Not Yet"}
        </p>
      </div>
    </li>
  );
}
