import videoTestData from "../data/videos.json";

const fetchVideos = async (url: string, revalidate?: boolean): Promise<YoutubeSearchListResp|null> => {
	const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
	const BASE_URL = "youtube.googleapis.com/youtube/v3";
  
	const response = await fetch(
	  `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
	);

	const data: YoutubeSearchListResp = await response.json();

	if (data?.error) {
		console.error("Youtube API error", data.error);
		return null;
	}
  
	return await response.json();
  };

export const getCommonVideos = async (url: string, revalidate?: boolean): Promise<Video[]|null> => {
	
	// console.log("getCommonVideos ====>", YOUTUBE_API_KEY)

	try {
		const isDev = process.env.NEXT_PUBLIC_DEVELOPMENT;
		// const response = await fetch(
		// 	`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`, { next: { revalidate: revalidate ? 10 : false } }
		// );

		console.log({ isDev });
		console.log("======>", process.env)
    	const data = isDev ? <YoutubeSearchListResp>videoTestData : await fetchVideos(url, revalidate);
		// const data: YoutubeSearchListResp = await response.json();
		if (!data) {
			return null;
		}

		return data.items.map((item) => {
			const id = processId(item);
			const snippet = item.snippet;
			console.log(item)
			return {
				title: snippet.title,
				imgUrl: snippet.thumbnails.high.url,
				id,
				description: snippet.description,
				publishTime: snippet.publishedAt,
				channelTitle: snippet.channelTitle,
				statistics: item.statistics ? item.statistics : { viewCount: 0 },
			};
		});
	} catch (error) {
		console.error("Something went wrong with video library", error);
		return [];
	}
};

export const getVideos = (searchQuery: string) => {
	const URL = `search?part=snippet&q=${searchQuery}&type=video`;
	return getCommonVideos(URL);
};

export const getPopularVideos = () => {
	const URL =
		"videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";

		//videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc
	return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId: string, revalidate?: boolean) => {
	// console.log("====>", videoId)
	const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  
	return getCommonVideos(URL, revalidate);
  };

function processId(item: VideoApiResp): string {
	if (typeof item.id === "string") {
		// Handle the case where the id is a string
		return item.id;
	} else {
		// Handle the case where the id is of type 'Id'
		return item.id.videoId;
	}
}

interface YoutubeSearchListResp {
	kind: string;
	etag: string;
	nextPageToken: string;
	regionCode: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	items: VideoApiResp[];
	error: string;
}

export interface Video {
	title: string;
	imgUrl: string;
	id: string;
	publishTime: string;
	description: string;
	channelTitle: string;
	statistics: {
		viewCount: number,
		likeCount?: number,
		favoriteCount?: number,
		commentCount?: number
	},
}

interface VideoApiResp {
	kind: string;
	etag: string;
	id: Id | string;
	snippet: Snippet;
	statistics?: {
		viewCount: number,
		likeCount?: number,
		favoriteCount?: number,
		commentCount?: number
	},
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
