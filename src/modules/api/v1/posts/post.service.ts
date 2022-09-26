import { Configuration, OpenAIApi } from 'openai';
import { Post } from './post.model';

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
      500
    )
  );
}

export async function topics(topic: string) {
  return await openai.createCompletion(
    baseObject(`create a list of 20 topics about ${topic}:`, 500)
  );
}

// create post schema to type entry
export async function save(post: any) {
  return await Post.create(post);
}

// get all posts pagitated
export async function getAll(offset: number, limit: number) {
  return await Post.findAndCountAll({
    where: { private: false },
    offset,
    limit,
    order: [['title', 'ASC']],
    attributes: {
      exclude: ['token'],
    },
  });
}

export async function byId(id: string) {
  return await Post.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['token'],
    },
  });
}

// get token by id
async function getToken(id: string) {
  const token = await Post.findOne({
    where: {
      id,
    },
  });

  return token?.token;
}

export async function update(id: string, post: any) {
  const token = await getToken(id);
  // check if token is equal to post.token
  if (token === post.token) {
    return await Post.update(post, {
      where: {
        id,
      },
    });
  } else {
    return null;
  }
}
