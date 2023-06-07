
export const getVideos = async (searchQuery: string): Promise<Video[]> => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&q=${searchQuery}%20trailer&key=${YOUTUBE_API_KEY}`
  );

  const data: YoutubeSearchListResp = await response.json();

  return data.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId
    }
  });
};

interface YoutubeSearchListResp {
  kind: string,
  etag: string,
  nextPageToken: string,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: VideoApiResp[]
}

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
  