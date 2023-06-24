export const getCommonVideos = async (url: string): Promise<Video[]> => {
	const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

	try {
		const BASE_URL = "youtube.googleapis.com/youtube/v3";
		const response = await fetch(
			`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
		);

		const data: YoutubeSearchListResp = await response.json();
		if (data?.error) {
			console.error("Youtube API error", data.error);
			return [];
		}

		return data.items.map((item) => {
			const id = processId(item);
			return {
				title: item.snippet.title,
				imgUrl: item.snippet.thumbnails.high.url,
				id,
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
	return getCommonVideos(URL);
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
}

interface VideoApiResp {
	kind: string;
	etag: string;
	id: Id | string;
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
