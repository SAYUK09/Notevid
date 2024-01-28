import axios from 'axios';

export const fetchVideos = async () => {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API;
  const searchQuery = encodeURIComponent("coding, podcast, upsc");
  const maxResults = 100;
  const regionCode = "in";

  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchQuery}&key=${apiKey}&regionCode=${regionCode}`;
  
  try {
    const response = await axios.get(url);

    const videos = response.data.items
      .filter((video: any) => video.id.videoId)
      .map((video: any) => ({
        videoId: video.id.videoId,
        channelId: video.snippet.channelId,
        channelTitle: video.snippet.channelTitle,
        description: video.snippet.description,
        publishTime: video.snippet.publishTime,
        thumbnail: video.snippet.thumbnails.medium.url,
        title: video.snippet.title,
      }));

    return videos;
  } catch (error:any) {
    console.error("Fetch error:", error.message);
    return [];
  }
};
