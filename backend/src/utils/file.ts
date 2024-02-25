import fs from 'fs/promises';

export async function clearUploadedFiles(...filePaths: string[]) {
    // Use Promise.all to wait for all file removal operations to complete
    await Promise.all(filePaths.map(async (filePath) => {
      try {
        // Check if the file exists before attempting to remove it
        await fs.access(filePath);
        await fs.unlink(filePath);
        console.log(`File removed: ${filePath}`);
      } catch (error) {
        console.error(`Error removing file ${filePath}:`, error);
      }
    }));
  }