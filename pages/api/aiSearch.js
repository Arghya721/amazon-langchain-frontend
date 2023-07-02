import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage , SystemChatMessage } from "langchain/schema";


// export default async function AISearch(prompt) {
//     const openai_api_key = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
//     const internalText = process.env.NEXT_PUBLIC_INTERNAL_TEXT;
//     const chat = new ChatOpenAI({ temperature: 1, openAIApiKey: openai_api_key });
//     const ans = await chat.call([ new SystemChatMessage(internalText), new HumanChatMessage(prompt) ]);

//     console.log(ans);
//     return ans;
// }