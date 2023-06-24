"use client";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { MouseEvent } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { magic } from "../../lib/magic-client";

const NavBar = () => {
	const router = useRouter();
	const [showDropdown, setShowDropdown] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		async function getUsername() {
			try {
				const { email } = await magic!.user.getMetadata();
				if (email) {
					setUsername(email);
				}
			} catch (error) {
				console.log("Error retrieving email:", error);
			}
		}
		getUsername();
	}, []);

	const handleOnClickHome = (e: MouseEvent) => {
		e.preventDefault();
		router.push("/");
	};

	const handleOnClickMyList = (e: MouseEvent) => {
		e.preventDefault();
		router.push("/browse/my-list");
	};

	const handleShowDropdown = (e: MouseEvent) => {
		e.preventDefault();
		setShowDropdown(!showDropdown);
	};

	const handleSignout = async (e) => {
		e.preventDefault();

		try {
			await magic!.user.logout();
			console.log(await magic!.user.isLoggedIn());
			router.push("/login");
		} catch (error) {
			console.error("Error logging out", error);
			router.push("/login");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<a className={styles.logoLink}>
					<div className={styles.logoWrapper}>
						<Image
							src="/static/netflix.svg"
							alt="Netflix logo"
							width="128"
							height="34"
						/>
					</div>
				</a>
				<ul className={styles.navItems}>
					<li className={styles.navItem} onClick={handleOnClickHome}>
						Home
					</li>
					<li
						className={styles.navItem2}
						onClick={handleOnClickMyList}
					>
						My List
					</li>
				</ul>
				<nav className={styles.navContainer}>
					<div>
						<button
							className={styles.usernameBtn}
							onClick={handleShowDropdown}
						>
							<p className={styles.username}>{username}</p>
							<Image
								src="/static/expand_more.svg"
								alt="Expand more"
								width="24"
								height="24"
							/>
						</button>

						{showDropdown && (
							<div className={styles.navDropdown}>
								<div>
									<a
										className={styles.linkName}
										onClick={handleSignout}
									>
										Sign out
									</a>
									<div className={styles.lineWrapper}></div>
								</div>
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default NavBar;
