import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft posts based on the environment */
export async function getAllNotes(): Promise<CollectionEntry<"note">[]> {
	return await getCollection("note", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}