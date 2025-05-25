import { addNewTag, getTags } from "@/lib/tags";

export const GET = async () => {
  const tags = await getTags();
  return new Response(JSON.stringify(tags), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const POST = async (request: Request) => {
  const { name } = await request.json();
  const tag = await addNewTag(name);
  return new Response(JSON.stringify(tag), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}