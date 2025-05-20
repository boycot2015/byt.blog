import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
	date: Date | undefined,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (date === undefined) {
		return "Invalid Date";
	}

	return new Intl.DateTimeFormat(siteConfig.date.locale, {
		...(siteConfig.date.options as Intl.DateTimeFormatOptions),
		...options,
	}).format(date);
}

export function collectionDateSort(
	a: CollectionEntry<"post" | "note">,
	b: CollectionEntry<"post" | "note">,
) {
	if (b.data.publishDate && a.data.publishDate)
	return  b.data.publishDate.getTime() - a.data.publishDate.getTime();
	if (b.data.date && a.data.date)
		return  b.data.date.getTime() - a.data.date.getTime();
	return 0
}
