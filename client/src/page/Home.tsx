// src/pages/Home.tsx
import { useUser } from "@clerk/clerk-react";
import { Sparkles, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 text-gray-900">
      <section className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center space-y-10 py-32 px-4">
        <div className="inline-flex items-center space-x-3">
          <Sparkles className="w-8 h-8 text-indigo-500" />
          <span className="text-lg font-semibold text-indigo-600">
            Welcome to Task Scheduler
          </span>
        </div>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Plan. Schedule. Relax.
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl">
          Take control of your productivity with our smart scheduling tool.
          Draft messages and set delivery times—let automation handle the rest.
        </p>
        <Link
          to={`/schedule/${user?.id}`}
          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <Clock className="w-5 h-5 mr-2" /> Schedule Your Task
        </Link>
      </section>
    </main>
  );
}
