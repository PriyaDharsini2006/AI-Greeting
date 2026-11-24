
"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateGreeting = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Validate input
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    setLoading(true);
    setError("");
    setGreeting("");

    try {
      // Send request to backend
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name }),
        }
      );

      // Convert backend response into JSON
      const data = await response.json();

      // Handle backend errors
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Display greeting received from backend
      setGreeting(data.greeting);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate greeting"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="mb-3 text-center text-3xl font-bold text-indigo-600">
          AI Greeting Generator
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Enter your name and get a personalized greeting!
        </p>

        <form onSubmit={generateGreeting}>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Greeting"}
          </button>

        </form>

        {/* Display error message */}
        {error && (
          <p className="mt-4 text-center text-red-500">
            {error}
          </p>
        )}

        {/* Display backend response below the button */}
        {greeting && (
          <div className="mt-6 rounded-lg bg-indigo-50 p-5">

            <h2 className="mb-2 font-semibold text-indigo-700">
              Your AI Greeting 🎉
            </h2>

            <p className="text-gray-700">
              {greeting}
            </p>

          </div>
        )}

      </div>

    </main>
  );
}
