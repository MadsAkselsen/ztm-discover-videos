import Card from "@/components/card/card";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import styles from "./page.module.css";
import SectionCards from "@/components/card/section-cards";
import { Video } from "@/lib/videos";

import { getVideos } from "../lib/videos";
// import { GetServerSidePropsContext } from "next";

// interface HomeProps {
// 	disneyVideos: Video[]
// }
// instead of using getServerSideProps, just fetch normally: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
// export async function getServerSideProps(context: GetServerSidePropsContext) {
// 	const disneyVideos = getVideos();

// 	return {
// 		props: { disneyVideos }, // will be passed to the page component as props
// 	};
// }

export default async function Home() {
	const disneyVideos = await getVideos();
	console.log({ disneyVideos });
	
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
