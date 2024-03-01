import fs from 'fs';
import path from 'path';

export async function GET(request, context) {
  const id = context.params.id
  // console.log(id)
  const directoryPath = path.join(process.cwd(), 'public', 'carousel', `${id}`);
  const files = fs.readdirSync(directoryPath);
  const images = files.map(file => `/carousel/${id}/${file}`);
  return new Response(JSON.stringify(images), {status: 200});
}
