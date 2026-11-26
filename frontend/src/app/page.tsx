
"use client";

import { useState } from "react";

export default function Home() {
  // Greeting states
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [greetingLoading, setGreetingLoading] = useState(false);
  const [greetingError, setGreetingError] = useState("");

  // Summarizer states
  const [paragraph, setParagraph] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

  // Generate Greeting
  const generateGreeting = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      setGreetingError("Please enter your name");
      return;
    }

    setGreetingLoading(true);
    setGreetingError("");
    setGreeting("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setGreeting(data.greeting);
    } catch (err) {
      setGreetingError(
        err instanceof Error
          ? err.message
          : "Failed to generate greeting"
      );
    } finally {
      setGreetingLoading(false);
    }
  };

  // Generate Summary
  const generateSummary = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!paragraph.trim()) {
      setSummaryError("Please enter a paragraph");
      return;
    }

    setSummaryLoading(true);
    setSummaryError("");
    setSummary("");

    try {
      const response = await fetch(`${API_URL}/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: paragraph }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSummary(data.summary);
    } catch (err) {
      setSummaryError(
        err instanceof Error
          ? err.message
          : "Failed to generate summary"
      );
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">

      <h1 className="mb-10 text-center text-4xl font-bold text-indigo-700">
        AI Applications
      </h1>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">

        {/* AI Greeting Generator */}

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-3 text-center text-2xl font-bold text-indigo-600">
            AI Greeting Generator
          </h2>

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
              disabled={greetingLoading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {greetingLoading
                ? "Generating..."
                : "Generate Greeting"}
            </button>

          </form>

          {greetingError && (
            <p className="mt-4 text-center text-red-500">
              {greetingError}
            </p>
          )}

          {greeting && (
            <div className="mt-6 rounded-lg bg-indigo-50 p-5">
              <h3 className="mb-2 font-semibold text-indigo-700">
                Your AI Greeting 🎉
              </h3>

              <p className="text-gray-700">
                {greeting}
              </p>
            </div>
          )}

        </div>

        {/* AI Text Summarizer */}

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-3 text-center text-2xl font-bold text-green-600">
            AI Text Summarizer
          </h2>

          <p className="mb-6 text-center text-gray-500">
            Enter a long paragraph and get a short summary!
          </p>

          <form onSubmit={generateSummary}>

            <textarea
              placeholder="Enter your paragraph here..."
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              rows={7}
              className="mb-4 w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-green-500"
            />

            <button
              type="submit"
              disabled={summaryLoading}
              className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {summaryLoading
                ? "Summarizing..."
                : "Summarize Text"}
            </button>

          </form>

          {summaryError && (
            <p className="mt-4 text-center text-red-500">
              {summaryError}
            </p>
          )}

          {summary && (
            <div className="mt-6 rounded-lg bg-green-50 p-5">
              <h3 className="mb-2 font-semibold text-green-700">
                Your AI Summary 📝
              </h3>

              <p className="whitespace-pre-wrap text-gray-700">
                {summary}
              </p>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
