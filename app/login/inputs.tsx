"use client";
import styles from "./login.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { magic } from "../../lib/magic-client";
import { useNavigationEvent } from "@/hooks/useNavigationEvent";

const Inputs = () => {
	const [email, setEmail] = useState("");
	const [userMsg, setUserMsg] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleComplete = () => {
		console.log("setting loading to false");
		setIsLoading(false);
	};

	useNavigationEvent(handleComplete);

	// useEffect(() => {
	// 	const handleComplete = () => {
	// 		setIsLoading(false);
	// 	};
	// 	router.events.on("routeChangeComplete", handleComplete);
	// 	router.events.on("routeChangeError", handleComplete);

	// 	return () => {
	// 		router.events.off("routeChangeComplete", handleComplete);
	// 		router.events.off("routeChangeError", handleComplete);
	// 	};
	// }, [router]);

	const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserMsg("");
		const email = e.target.value;
		setEmail(email);
	};

	const handleLoginWithEmail = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		setIsLoading(true);

		if (!magic) return;

		if (email) {
			if (email === "akselsenmads@gmail.com") {
				// route to dashboard
				// router.push("/");
				try {
					const didToken = await magic.auth.loginWithMagicLink({
						email,
					});
					if (didToken) {
						router.push("/");
					}
				} catch (error) {
					// Handle errors if required!
					console.log("setting loading to false");
					setIsLoading(false);
					console.error("Something went wrong logging in", error);
				}
			} else {
				console.log("setting loading to false");
				setIsLoading(false);
				setUserMsg("Something went wrong logging in");
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
						{isLoading ? "Loading..." : "Sign In"}
					</button>
				</div>
			</div>
		</main>
	);
};

export default Inputs;
