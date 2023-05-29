import Card from "@/components/card/card";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<h1>Netflix</h1>

			<NavBar username="akselsenmads@gmail.com" />
			<Banner
				title="Clifford the red dog"
				subTitle="a very cute dog"
				imgUrl="/static/clifford.webp"
			/>
			<Card imgUrl="/static/clifford.webp" size="large" />
			<Card imgUrl="/static/clifford.webp" size="medium" />
			<Card imgUrl="/static/clifford.webp" size="small" />
		</div>
	);
}
