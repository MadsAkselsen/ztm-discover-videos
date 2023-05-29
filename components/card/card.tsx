"use client";
import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";

interface BannerProps {
	imgUrl: string;
	size: "large" | "medium" | "small";
}

const classMap = {
	large: styles.lgItem,
	medium: styles.mdItem,
	small: styles.smItem,
};

const Card: React.FC<BannerProps> = ({
	imgUrl = "/static/clifford.webp",
	size = "medium",
}) => {
	const [imgSrc, setImgSrc] = useState(imgUrl);

	// fallback image if there is an error in the image src
	const handleOnError = () => {
		console.log("hii error");
		setImgSrc("/static/clifford.webp");
	};

	return (
		<div className={styles.container}>
			Card
			<div className={classMap[size]}>
				<Image
					src={imgSrc}
					alt="image"
					fill={true}
					onError={handleOnError}
					className={styles.cardImg}
				/>
			</div>
		</div>
	);
};

export default Card;
