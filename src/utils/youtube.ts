
/**
 * Extracts the YouTube video ID from various YouTube URL formats
 */
export function extractVideoId(url: string): string | null {
  if (!url) return null;
  
  // Regular expression to match YouTube video IDs from various URL formats
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  
  return match && match[1] ? match[1] : null;
}
