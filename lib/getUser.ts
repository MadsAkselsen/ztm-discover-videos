// import router from "next/router";
import { magic } from "./magic-client";

export const getUser = async () => {
	if (!magic) {
		console.warn("magic not loaded yet");
		return;
	}
	const isLoggedIn = await magic.user.isLoggedIn();
	return isLoggedIn;
	// if (isLoggedIn) {
	// 	// route to /
	// 	router.push("/");
	// } else {
	// 	// route to /login
	// 	router.push("/login");
	// }
};
