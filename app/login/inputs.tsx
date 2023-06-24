"use client";
import styles from "./login.module.css";
const handleLoginWithEmail = async (e: React.MouseEvent<HTMLElement>) => {
	e.preventDefault();
	console.log("hi button");
};

const Inputs = () => {
	return (
		<div>
			<input
				type="text"
				placeholder="Email address"
				className={styles.emailInput}
			/>

			<p className={styles.userMsg}></p>
			<button onClick={handleLoginWithEmail} className={styles.loginBtn}>
				Sign In
			</button>
		</div>
	);
};

export default Inputs;
