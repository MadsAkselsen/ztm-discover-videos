import Card from "@/components/card/card";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import styles from "./page.module.css";
import SectionCards from "@/components/card/section-cards";

import { getVideos } from "../lib/videos";

export default function Home() {
	const disneyVideos = getVideos();
	return (
		<div className={styles.container}>
			<NavBar username="akselsenmads@gmail.com" />
			<Banner
				title="Clifford the red dog"
				subTitle="a very cute dog"
				imgUrl="/static/clifford.webp"
			/>
			<div className={styles.sectionWrapper}>
				<SectionCards
					title="Disney"
					videos={disneyVideos}
					size="large"
				/>
				<SectionCards
					title="Disney"
					videos={disneyVideos}
					size="medium"
				/>
			</div>
		</div>
	);
}
