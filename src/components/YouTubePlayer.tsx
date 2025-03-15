
import React, { useEffect, useState } from 'react';
import { extractVideoId } from '@/utils/youtube';

interface YouTubePlayerProps {
  url: string;
  isPlaying: boolean;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ url, isPlaying }) => {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      const id = extractVideoId(url);
      setVideoId(id);
    }
  }, [url]);

  if (!videoId) return null;

  // Create YouTube embed URL with autoplay parameter based on isPlaying state
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? '1' : '0'}&mute=0&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}`;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <iframe
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        title="YouTube video player"
      />
    </div>
  );
};

export default YouTubePlayer;
