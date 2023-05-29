import Banner from "../components/banner/banner";
import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<h1>Netflix</h1>

			{/* <NavBar /> */}
			<Banner
				title="Clifford the red dog"
				subTitle="a very cute dog"
				imgUrl="/static/clifford.webp"
			/>
			{/* <Card /> */}
		</div>
	);
}
