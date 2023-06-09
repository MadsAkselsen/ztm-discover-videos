"use client";
import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";
import cls from "classnames";
import { motion } from "framer-motion";

interface CardProps {
	imgUrl: string;
	size: "large" | "medium" | "small";
	id: number;
}

const classMap = {
	large: styles.lgItem,
	medium: styles.mdItem,
	small: styles.smItem,
};

const Card: React.FC<CardProps> = ({
	imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80",
	size = "medium",
	id,
}) => {
	const [imgSrc, setImgSrc] = useState(imgUrl);

	// fallback image if there is an error in the image src
	const handleOnError = () => {
		console.log("hii error");
		setImgSrc(
			"https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
		);
	};

	const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

	return (
		<div className={styles.container}>
			<motion.div
				className={cls(styles.imgMotionWrapper, classMap[size])}
				whileHover={{ ...scale }}
			>
				<Image
					src={imgSrc}
					alt="image"
					fill={true}
					sizes="(max-width: 768px) 100px, (max-width: 1200px) 200px, 200px"
					onError={handleOnError}
					className={styles.cardImg}
				/>
			</motion.div>
		</div>
	);
};

export default Card;
