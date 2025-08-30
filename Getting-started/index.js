import { GenerateContentResponse, GoogleGenAI } from "@google/genai";
import { promises as fs } from "fs";
import readlineSync from "readline-sync";
import dotenv from 'dotenv'

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function main() {

  const question = readlineSync.question('Ask a question: ');

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: question,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });

  const answerText = response.text;

  console.log('\n' + answerText + '\n')

  const fileUrl2 = new URL("./logs.txt", import.meta.url);
  await fs.appendFile(fileUrl2, response+'\n', "utf8");
  await fs.appendFile(fileUrl2, response.usageMetadata.totalTokenCount+'\n', "utf8");
  await fs.appendFile(fileUrl2, response.modelVersion+'\n', "utf8");
  await fs.appendFile(fileUrl2, response.sdkHttpResponse.date+'\n', "utf8");  
  await fs.appendFile(fileUrl2, '\n----------------------------------------\n', "utf8");  
  
  

  const timestamp = new Date().toISOString();
  const model = response.modelVersion
  const entry = `\n[${timestamp}]\nmodel: ${model}\nQ: ${question}\nAns: ${answerText}\n----\n`;
  const fileUrl = new URL("./responses.txt", import.meta.url);
  await fs.appendFile(fileUrl, entry, "utf8");

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


