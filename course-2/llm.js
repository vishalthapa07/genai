import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDHHRhiNNa7xduknhJLXfBv6cwf4a9TBf4",
});

// creating and saving the chat history manually in history array

const history = [];

async function chatting(userProblem) {
  history.push({ role: "user", parts: [{ text: userProblem }] });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: history,
  });

  history.push({ role: "model", parts: [{ text: response.text }] });

  console.log(response.text);
}

async function main() {
  const userProblem = readlineSync.question("Ask a question: ");
  await chatting(userProblem);
  main();
}

main();
