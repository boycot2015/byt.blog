import { type CollectionEntry, getCollection } from "astro:content";
import api from '@/api'
/** filter out draft posts based on the environment */
export async function getAllPosts({ size = 10, page = 1 } = {}): Promise<CollectionEntry<"post">[]> {
	let localPosts = await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
	let res = await api.post.get({ size, page })
	let cmsPosts = res.data[0]?.map((item:any) => ({
		id: item.id,
		data: {
			title: item.title,
			description: item.content,
			// coverImage: { alt: item.title, src: item.img },
			draft: item.status == 1002,
			categories: [item.categoryName || item.category?.value || '未分类' ],
			tags: item.tags?.map((item:any) => item.value).filter(Boolean),
			publishDate: new Date(item.updateTime || item.createTime || ''),
			rendered: {
				html: item.content,
				metadata: {}
			}
		},
		body: item.content,
		collection: 'post'
	  }))
	// console.log(res.data[0].length, localPosts[0], 'cmsPosts');
	return [...cmsPosts, ...localPosts]
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts: CollectionEntry<"post">[]) {
	return posts.reduce<Record<string, CollectionEntry<"post">[]>>((acc, post) => {
		const year = post.data.publishDate.getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year]?.push(post);
		return acc;
	}, {});
}

/** returns all tags created from posts (inc duplicate tags)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getAllTags(posts: CollectionEntry<"post">[]) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTags(posts: CollectionEntry<"post">[]) {
	return [...new Set(getAllTags(posts))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[]): [string, number][] {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}

/** returns all categories created from posts (inc duplicate categories)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getAllCategories(posts: CollectionEntry<"post">[]) {
	// let res = await api.post.getCategory()
	return posts.flatMap((post) => [...post.data.categories.slice(-1)]);
}

/** returns all unique categories created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueCategories(posts: CollectionEntry<"post">[]) {
	return [...new Set(getAllCategories(posts))];
}

/** returns a count of each unique tag - [[categoryName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueCategoriesWithCount(posts: CollectionEntry<"post">[]): [string, number][] {
	return [
		...getAllCategories(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}