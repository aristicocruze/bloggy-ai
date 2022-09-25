import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function get(search: string) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `create a long blog post that has a title and content about ${search}:`,
    temperature: 0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response;
}
