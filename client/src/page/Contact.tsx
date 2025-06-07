const Contact = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-indigo-100 text-gray-900 p-6">
      <section className="max-w-3xl mx-auto space-y-8 py-20">
        <h2 className="text-4xl font-bold text-center">Get in Touch</h2>
        <p className="text-center text-gray-700 text-lg">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <form className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
          <textarea
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 min-h-[120px]"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
