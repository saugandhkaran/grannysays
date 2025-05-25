import { addNewTip, getTipsByQuery } from "../../../lib/tips";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || '1';
  const tag = searchParams.get("tag") || undefined;
  const search = searchParams.get("search") || undefined;

  const tips = await getTipsByQuery({
    page: Number(page),
    tag,
    search,
  });

  return new Response(JSON.stringify(tips));
}

export async function POST(request: Request) {
  const { title, description, tipNumber, date, category, tags, sayings } =
    await request.json();

  const tip = await addNewTip({
    title,
    description,
    tipNumber,
    date,
    category,
    tags,
    sayings,
  });

  return new Response(JSON.stringify(tip));
}