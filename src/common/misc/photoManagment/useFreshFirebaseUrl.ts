import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "@/config/firebase.config";

// Session-level cache: storage path -> fresh download URL
const urlCache = new Map<string, string>();

function extractStoragePath(url: string): string | null {
	try {
		const urlObj = new URL(url);
		if (!urlObj.hostname.includes("firebasestorage.googleapis.com"))
			return null;
		const match = urlObj.pathname.match(/\/o\/(.+)/);
		if (!match) return null;
		return decodeURIComponent(match[1]);
	} catch {
		return null;
	}
}

/**
 * Takes a stored Firebase Storage URL (potentially with a stale token) and
 * returns a fresh download URL by re-fetching it from Firebase Storage.
 * Falls back to the original URL if the input is not a Firebase Storage URL.
 */
export default function useFreshFirebaseUrl(
	storedUrl: string | undefined,
): string | undefined {
	// For non-Firebase URLs use immediately; for Firebase URLs wait for a fresh token
	const isFirebaseUrl = !!storedUrl?.includes("firebasestorage.googleapis.com");
	const [freshUrl, setFreshUrl] = useState<string | undefined>(
		isFirebaseUrl ? undefined : storedUrl,
	);

	useEffect(() => {
		if (!storedUrl) {
			setFreshUrl(undefined);
			return;
		}

		const path = extractStoragePath(storedUrl);
		if (!path) {
			setFreshUrl(storedUrl);
			return;
		}

		if (urlCache.has(path)) {
			setFreshUrl(urlCache.get(path));
			return;
		}

		getDownloadURL(ref(storage, path))
			.then((url) => {
				urlCache.set(path, url);
				setFreshUrl(url);
			})
			.catch(() => {
				setFreshUrl(storedUrl);
			});
	}, [storedUrl]);

	return freshUrl;
}
