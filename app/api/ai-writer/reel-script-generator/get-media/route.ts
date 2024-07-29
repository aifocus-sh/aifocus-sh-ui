export async function GET(req: Request) {
  if (!process.env.PIXABAY_TOKEN) {
    throw new Error("PUBLIC_NEXT_PIXABAY_TOKEN is not defined");
  }

  const { searchParams } = new URL(req.url);

  const params = new URLSearchParams();
  params.append("key", process.env.PIXABAY_TOKEN);
  params.append("orientation", "horizontal");
  params.append("category", "nature");
  params.append("pretty", "true");
  params.append("order", "popular");
  params.append("safesearch", "true");
  params.append("per_page", "3");

  const url = `https://pixabay.com/api/${
    searchParams.get("type") === "video" ? "videos/" : ""
  }?${params.toString()}&q=${searchParams.get("q")?.replaceAll(" ", "+")}`;
  const options = { method: "GET" };

  const response = await fetch(url, options);
  const data = await response.json();

  return Response.json(data?.hits?.[0]);
}
