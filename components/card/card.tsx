import Image from "next/image";
import styles from "./card.module.css";

interface BannerProps {
	imgUrl: string;
	size: "large" | "medium" | "small";
}

const classMap = {
	large: styles.lgItem,
	medium: styles.mdItem,
	small: styles.smItem,
};

const Card: React.FC<BannerProps> = ({ imgUrl, size }) => {
	return (
		<div className={styles.container}>
			Card
			<div className={classMap[size]}>
				<Image
					src={imgUrl}
					alt="image"
					fill={true}
					className={styles.cardImg}
				/>
			</div>
		</div>
	);
};

export default Card;
