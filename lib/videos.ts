import videoData from "../data/videos.json";

export const getVideos = async (): Promise<Video[]> => {
  return videoData.items.map((item: VideoApiResp) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId
    }
  });
};

export interface Video {
  title: string;
  imgUrl: string;
  id: string;
}

interface VideoApiResp {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
}

interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }
  
  interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  }
  
  interface Id {
    kind: string;
    videoId: string;
  } 
  