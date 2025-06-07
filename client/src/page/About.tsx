const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-100 via-white to-purple-100 text-gray-900 p-6">
      <section className="max-w-4xl mx-auto space-y-6 py-20">
        <h2 className="text-4xl font-bold text-center">About Task Scheduler</h2>
        <p className="text-lg text-gray-800 text-center">
          Task Scheduler is designed to help you stay productive and manage your
          time better by allowing you to pre-schedule important messages or
          reminders. Whether you're a professional, student, or entrepreneur,
          our platform ensures your tasks are never forgotten.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
            <p className="text-gray-700">
              Simple and intuitive interface that works seamlessly across all
              devices.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-700">
              Your data is protected and delivered on-time, every time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
