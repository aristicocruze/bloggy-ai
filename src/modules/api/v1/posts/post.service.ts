import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function baseObject(searchPrompt: string, maxTokens: number) {
  return {
    model: 'text-davinci-002',
    prompt: searchPrompt,
    temperature: 0,
    max_tokens: maxTokens,
    top_p: 1.0,
    frequency_penalty: 2.0,
    presence_penalty: 2.0,
  };
}

export async function generate(search: string) {
  return await openai.createCompletion(
    baseObject(
      `create a long blog post that has a title and content about ${search}:`,
      250
    )
  );
}

export async function topics(topic: string) {
  return await openai.createCompletion(
    baseObject(`list 40 topics about ${topic}:`, 250)
  );
}
