"use client";

import styles from "./Video.module.css";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import clsx from "classnames";

Modal.setAppElement("body");

const Video = ({ params }: { params: { slug: string } }) => {
	console.log(params.slug);
	const router = useRouter();

	const video = {
		title: "Hi cute dog",
		publishTime: "1990-01-01",
		description:
			"A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger?",
		channelTitle: "Paramount Pictures",
		viewCount: 10000,
	};

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
