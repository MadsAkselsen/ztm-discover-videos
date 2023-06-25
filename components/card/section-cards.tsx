import { Video } from "@/lib/videos";
import Card from "./card";
import styles from "./section-cards.module.css";
import Link from "next/link";

interface SectionCardProps {
	title: string;
	videos: Video[];
	size: "large" | "medium" | "small";
}

const SectionCards: React.FC<SectionCardProps> = ({ title, videos, size }) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.cardWrapper}>
				{videos.map((video, idx) => {
					console.log({ video });
					return (
						<Link key={idx} href={`/video/${video.id}`}>
							<Card
								key={idx}
								id={idx}
								imgUrl={video.imgUrl}
								size={size}
							/>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default SectionCards;
