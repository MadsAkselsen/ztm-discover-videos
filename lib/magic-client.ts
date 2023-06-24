import { Magic } from "magic-sdk";
const createMagic = () => {
	// window is undefined on the server, where this
	// function is also running. Should only run
	// on client side.
	if (typeof window !== "undefined") {
		const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!);
		if (magic) {
			return magic;
		} else {
			console.warn("Magic is undefined");
		}
	} else {
		console.warn("Cannot initialize magic. Windows is undefined");
	}
};

export const magic = createMagic();

console.log("magic setup", magic);
