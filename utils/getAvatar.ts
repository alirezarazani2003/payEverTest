import axios from 'axios';
import { promises } from 'fs';

export async function downloadAvatar(
  url: string,
  filename: string,
  id: string,
): Promise<string> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const base64String = Buffer.from(response.data, 'binary').toString('base64');
  const jsonObject = `{
    "id": "${id}",
    "hash": "${base64String}",
  }`;
  await promises.writeFile(filename, jsonObject);
  return base64String;
}
