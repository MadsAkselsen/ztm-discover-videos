"use client";
import styles from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Inputs = () => {
	const [email, setEmail] = useState("");
	const [userMsg, setUserMsg] = useState("");

	const router = useRouter();

	const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserMsg("");
		console.log("event", e);
		const email = e.target.value;
		setEmail(email);
	};

	const handleLoginWithEmail = async (e: React.MouseEvent<HTMLElement>) => {
		console.log("hi button", email);
		e.preventDefault();

		if (email) {
			if (email === "akselsenmads@gmail.com") {
				// route to dashboard
				router.push("/");
			} else {
				console.log("Something went wrong logging in");
			}
		} else {
			// show user message
			setUserMsg("Enter a valid email address");
		}
	};

	return (
		<main className={styles.main}>
			<div className={styles.mainWrapper}>
				<h1 className={styles.signinHeader}>Sign In</h1>

				<div>
					<input
						type="text"
						placeholder="Email address"
						className={styles.emailInput}
						onChange={handleOnChangeEmail}
					/>

					<p className={styles.userMsg}>{userMsg}</p>
					<button
						onClick={handleLoginWithEmail}
						className={styles.loginBtn}
					>
						Sign In
					</button>
				</div>
			</div>
		</main>
	);
};

export default Inputs;
