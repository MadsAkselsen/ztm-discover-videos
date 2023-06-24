"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { magic } from "../lib/magic-client";

// Run a function when the current page changes to a new path.
// E.g. setting some state before on path change. For example,
// set user auth loading state to false, when the auth is successfull
// and the route changes to the home page (the button should show loading
// sate anymore)
export const useLoadUser = async () => {
	const router = useRouter();
	// if (!router) return;
	console.log("useLoader", router);

	useEffect(() => {
		const handleLoggedIn = async () => {
			const isLoggedIn = await magic!.user.isLoggedIn();
			if (isLoggedIn) {
				// route to /
				router.push("/");
			} else {
				// route to /login
				router.push("/login");
			}
		};
		handleLoggedIn();
	}, [router]);
};
