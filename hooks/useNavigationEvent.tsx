"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Run a function when the current page changes to a new path.
// E.g. setting some state before on path change. For example,
// set user auth loading state to false, when the auth is successfull
// and the route changes to the home page (the button should show loading
// sate anymore)
export const useNavigationEvent = (onPathnameChange: () => void) => {
	const pathname = usePathname(); // Get current route
	// Save pathname on component mount into a REF
	const savedPathNameRef = useRef(pathname);

	useEffect(() => {
		// If REF has been changed, do the stuff
		if (savedPathNameRef.current !== pathname) {
			onPathnameChange();
			// Update REF
			savedPathNameRef.current = pathname;
		}
	}, [pathname, onPathnameChange]);
};
