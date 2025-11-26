import { GenerateContentResponse, GoogleGenAI } from "@google/genai";
import { promises as fs } from "fs";
import readlineSync from "readline-sync";
import dotenv from 'dotenv'

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function createLogs(response)
{    
  const fileUrl2 = new URL("./logs.txt", import.meta.url);
  await fs.appendFile(fileUrl2, response.usageMetadata.totalTokenCount+'\n', "utf8");
  await fs.appendFile(fileUrl2, response.modelVersion+'\n', "utf8");
  await fs.appendFile(fileUrl2, '\n_______________________________________________\n', "utf8");  
}

async function createRecords(response, question)
{
    const timestamp = new Date().toISOString();
    const model = response.modelVersion
    const entry = `\n[${timestamp}]\nmodel: ${model}\nQ: ${question}\nAns: ${response.text}\n_________________________________________________\n`;
    const fileUrl = new URL("./responses.txt", import.meta.url);
    await fs.appendFile(fileUrl, entry, "utf8");
}

var history = [];

async function main() {

  const question = readlineSync.question('Ask a question: ');

  history.push({
    role : "user",
    parts : [{text : question}]
  })

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents : history,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
      systemInstruction: `You have to behave like a cool therapist. If the patient discusses with you his problems, reply politely. If the queries of the user are dangerous, don't give any advice being a chatbot and tell the user to seek medical help. Don't reply about anything which doesn't help with the therapy.`
    }
  });

  const answerText = response.text;

  history.push({
    role : "user",
    parts : [{text : answerText}]
  })

  await createLogs(response);

  console.log('\n' + answerText + '\n') 
  
  await createRecords(response, question);

}

async function run() {
  while(true) {
    try {
      await main();
    } catch (error) {
      console.error('An error occurred:', error.message);
      // Optional: Add a small delay before continuing
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

run().catch(console.error);


