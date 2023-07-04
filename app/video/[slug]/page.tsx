"use client";

import styles from "./Video.module.css";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import clsx from "classnames";
import { getVideos, getYoutubeVideoById } from "@/lib/videos";
import { fetcher } from "@/util";
import useSWR from "swr";
// import { fetchTest } from "@/app/api/fetchtest";

Modal.setAppElement("body");

// async function getVideo(videoId: string) {
	
// 	// const videoArray = await getYoutubeVideoById(videoId);
// 	// const video = videoArray[0];

// 	const video = {
// 		title: "Hi cute dog",
// 		publishTime: "1990-01-01",
// 		description:
// 			"A big red dog",
// 		channelTitle: "Paramount Pictures",
// 		viewCount: 10000,
// 	};

// 	return video

// 	// return res.json();
// }

interface VideoProps {
	params: { slug: string },
	message: string
}

const Video: React.FC<VideoProps> = ({params, message}) => {
	console.log("from component ===> ",params.slug, message);
	const { data, error, isLoading } = useSWR(`http://localhost:3000/api/video/${params.slug}`, fetcher)
	console.log("data ==>", data)

	

	const router = useRouter();
	if (isLoading) {return <div>Loading data...</div>}
		const video = data.message

	// const response = await fetch(`http://localhost:3000/api/video/${params.slug}`)
	// console.log("resposne", await response.json())
	// const data = await response.json()
	// const video = data.message
	// const video = await getVideo(params.slug)
	// const disneyVideos = await getVideos("disney trailer");
	// const video = disneyVideos[0]

	

	const { title, publishTime, description, channelTitle, viewCount } = video;

	return (
		<div className={styles.container}>
			video page {params.slug}
			<Modal
				isOpen={true}
				contentLabel="Watch the video"
				onRequestClose={() => router.back()}
				className={styles.modal}
				overlayClassName={styles.overlay}
			>
				<iframe
					id="ytplayer"
					className={styles.videoPlayer}
					type="text/html"
					width="100%"
					height="360"
					src={`https://www.youtube.com/embed/${params.slug}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
					frameBorder="0"
				></iframe>

				<div className={styles.modalBody}>
					<div className={styles.modalBodyContent}>
						<div className={styles.col1}>
							<p className={styles.publishTime}>{publishTime}</p>
							<p className={styles.title}>{title}</p>
							<p className={styles.description}>{description}</p>
						</div>
						<div className={styles.col2}>
							<p
								className={clsx(
									styles.subText,
									styles.subTextWrapper
								)}
							>
								<span className={styles.textColor}>Cast: </span>
								<span className={styles.channelTitle}>
									{channelTitle}
								</span>
							</p>
							<p
								className={clsx(
									styles.subText,
									styles.subTextWrapper
								)}
							>
								<span className={styles.textColor}>
									View Count:{" "}
								</span>
								<span className={styles.channelTitle}>
									{viewCount}
								</span>
							</p>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Video;
