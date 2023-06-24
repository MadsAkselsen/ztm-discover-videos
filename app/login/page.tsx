import { Metadata } from "next";
import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";
import Inputs from "./inputs";

export const metadata: Metadata = {
	title: "Netflix SignIn",
	description: "Login page descripiton",
};

const Login = () => {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.headerWrapper}>
					<Link className={styles.logoLink} href="/">
						<div className={styles.logoWrapper}>
							<Image
								src="/static/netflix.svg"
								alt="Netflix logo"
								width="128"
								height="34"
							/>
						</div>
					</Link>
				</div>
			</header>

			<main className={styles.main}>
				<div className={styles.mainWrapper}>
					<h1 className={styles.signinHeader}>Sign In</h1>

					<Inputs />
				</div>
			</main>
		</div>
	);
};

export default Login;
