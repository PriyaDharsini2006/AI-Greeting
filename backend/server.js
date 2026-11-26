
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({ message: "Greeting API is running!" });
});

app.post("/", async (req, res) => {
  try {
    const { name } = req.body ?? {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        error: "Please provide a valid name."
      });
    }

    const response = await client.responses.create({
      model: "gpt-6.2-astra",
      input: `Generate a personalized, friendly greeting for ${name.trim()}. Keep it short and interesting.`
    });

    res.json({
      greeting: response.output_text
    });

  } catch (error) {
    console.error("Greeting API Error:", error);

    res.status(500).json({
      error: "Failed to generate greeting. Check backend logs."
    });
  }
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
