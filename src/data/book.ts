import { type CollectionEntry, getCollection } from "astro:content";
import { siteConfig } from '@/site.config'

const $api = siteConfig.$api;
/** filter out draft posts based on the environment */
export async function getAllbooks(): Promise<CollectionEntry<"ebook">[]> {
    let res = await $api.book.get();
	return await getCollection("ebook").then((books) => {
        return [...res?.map((el:any) => ({
            id: el.attributes.title,
            data: { objectId: el.id, ...el.attributes, file: el.attributes.url },
            collection: 'ebook'
        })) || [], ...books.filter(el => el.data.title)]
    });
}