import fs from "fs";
import path from "path";

export async function GET(request, context) {
  const slug = context.params.slug
  const folder = path.join(process.cwd(), "posts");
  const file = `${folder}/${slug}.md`;
  if (!fs.existsSync(file)) {
    return new Response("Not found", { status: 404 });
  }
  const content = fs.readFileSync(file, "utf8");
  return new Response(JSON.stringify(content), { status: 200 });
};
