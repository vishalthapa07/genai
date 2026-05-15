import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDHHRhiNNa7xduknhJLXfBv6cwf4a9TBf4",
});

// automatically saving the chat history

const chat = ai.chats.create({
  model: "gemini-3-flash-preview",
  history: [],
});

async function main() {
  const userProblem = readlineSync.question("Ask a question: ");
  const response = await chat.sendMessage({
    message: userProblem,
  });

  console.log(response.text);
  main();
}

main();
