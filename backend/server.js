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



const PORT = process.env.PORT || 8001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});