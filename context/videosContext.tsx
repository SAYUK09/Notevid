import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface VideoArr {
  videoId: string;
  channelId: string;
  channelTitle: string;
  description: string;
  publishTime: string;
  thumbnail: string;
  title: string;
}

export interface VideoContext {
  videos: VideoArr[];
}

export const VideoContext = createContext({} as VideoContext);

export const VideoProvider: React.FC = ({ children }) => {
  const [videoArr, setVideoArr] = useState<VideoArr[]>([
    {
      videoId: " string",
      channelId: " string",
      channelTitle: " string",
      description: " string",
      publishTime: " string",
      thumbnail: " string",
      title: " string",
    },
  ]);
  useEffect(() => {
    (async () => {
      const {
        data: { items },
      } = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=javscript%2C%20podcast%2C%20startup&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}&regionCode=in`
      );

      const videoData = items.map((video: any) => {
        return {
          videoId: video.id.videoId,
          channelId: video.snippet.channelId,
          channelTitle: video.snippet.channelTitle,
          description: video.snippet.description,
          publishTime: video.snippet.publishTime,
          thumbnail: video.snippet.thumbnails.medium.url,
          title: video.snippet.title,
        };
      });
      setVideoArr(videoData);
    })();
  }, []);

  return (
    <VideoContext.Provider value={{ videos: videoArr }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => {
  return useContext(VideoContext);
};
