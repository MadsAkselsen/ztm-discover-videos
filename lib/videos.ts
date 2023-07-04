export const getCommonVideos = async (url: string, revalidate?: boolean): Promise<Video[]> => {
	const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
	// console.log("getCommonVideos ====>", YOUTUBE_API_KEY)

	try {
		const BASE_URL = "youtube.googleapis.com/youtube/v3";
		const response = await fetch(
			`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`, { next: { revalidate: revalidate ? 10 : false } }
		);

		const data: YoutubeSearchListResp = await response.json();
		if (data?.error) {
			console.error("Youtube API error", data.error);
			return [];
		}

		return data.items.map((item) => {
			const id = processId(item);
			const snippet = item.snippet;
			return {
				title: snippet.title,
				imgUrl: snippet.thumbnails.high.url,
				id,
				description: snippet.description,
				publishTime: snippet.publishedAt,
				channelTitle: snippet.channelTitle,
				statistics: item.statistics ? item.statistics : { viewCount: 0 },
				viewCount: 0
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
	viewCount: number;
}

interface VideoApiResp {
	kind: string;
	etag: string;
	id: Id | string;
	snippet: Snippet;
	statistics: any
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
