import { type CollectionEntry, getCollection } from "astro:content";
import { siteConfig } from '@/site.config'

const $api = siteConfig.$api;
/** filter out draft posts based on the environment */
export async function getAllbooks(): Promise<CollectionEntry<"ebook">[]> {
    const [apiBooks, localBooks] = await Promise.all([
        $api.book.get(),
        getCollection("ebook")
    ]);

    const formattedApiBooks = apiBooks?.map((el: any) => ({
        id: el.attributes.title,
        body: '',
        data: { 
            img: el.attributes?.img?.replace('dailynote', 'blog-cloud') || '',
            title: el.attributes.title,
            author: el.attributes.author || '',
            file: el.attributes.url.replace('dailynote', 'blog-cloud'),
            objectId: el.id,
            description: el.attributes.description || ''
        },
        collection: 'ebook' as const,
        rendered: undefined,
        filePath: undefined
    })) || [];

    return [...formattedApiBooks, ...localBooks.filter(el => el.data.title)];
}