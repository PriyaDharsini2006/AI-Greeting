import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";


const app= express();
app.use(cors());
app.use(express.json());
dotenv.config();


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


app.post("/",async (req,res)=>{
    try{
        const {name} = req.body;

        const response = await client.responses.create({
            model: "gpt-6.2-astra",
            input: `Generate a personalized, friendly greeting for ${name.trim()}. Keep it short and interesting.`,
          });
          res.json({
            greeting: response.output_text
          })
    }
    catch(error){
        res.status(500).json({error: "Internal server error"});
    }
});


app.post("/summarize",async (req,res)=>{
    try{
        const {text} = req.body;
        const response = await client.responses.create({
            model: "gpt-6.2-astra",
            instructions: `You are an expert text summarizer.
                Summarize the given text in simple and clear English.
                Preserve the important facts, key ideas and meaning.
                Remove unnecessary details and repetition.
                Make the summary concise and easy to understand.
                Do not add information that is not present in the original text.`,
                input: text
          });
          res.json({
            summary: response.output_text
          })
    }
    catch(error){
        res.status(500).json({error: "Internal server error"});
    }
});


app.listen(8001,()=>{
    console.log("Server is running on port 8001");
});


