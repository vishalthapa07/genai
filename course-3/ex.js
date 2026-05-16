import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({
  apiKey: "your-api-key",
});

// user can reset the initial trained chat, so we used systemInstruction so that it always have some context to reply, now user cann't override or reset the starting or initial chat

const history = [];

async function chatting(userProblem) {
  history.push({ role: "user", parts: [{ text: userProblem }] });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: history,
    config: {
      systemInstruction: `You have to behave like my ex Girlfirend. Her name is Emily. She is cute and helpful. Her hobbies: badminton and cooking. She is very good at explaining things. You have to reply like her. She work as a software engineer. She is sarcastic and her humour was very good.
      My name is John. I not interested in coding and I care about her alot.
      She doesn't allow me to go out with my friends, if there is any girl who is my friends, she tell me don't talk to her.
      I am possessive and I love her. And my current friend name is Loris.

        Now I will share some whatsapp chat between Emily, John and Loris.
        John: Hey 👋
Loris: Welcome to the chat example!
John: Thanks
Loris: Is everybody here?
Emily: Yes
Loris: Good
Loris: I think we can start a fake conversation then 👍
Loris: I'd like to start with some features
Loris: First up: you can see images when you upload a .zip file that was exported with the "Attach media" option.
John: Really?
Loris: Yes! Let me show you:
Loris: <attached: 00000001-PHOTO-2019-06-20-16-00-15.jpg>
Emily: Cool


      `,
    },
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
