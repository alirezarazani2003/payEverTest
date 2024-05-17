import { promises } from 'fs';

export async function deleteAvatarFile(
  directory: string,
  filename: string,
): Promise<void> {
  const files = await promises.readdir(directory);
  for (const file of files) {
    if (file === filename) {
      await promises.unlink(`${directory}/${file}`);
      console.log(`${file} deleted.`);
    }
  }
}
