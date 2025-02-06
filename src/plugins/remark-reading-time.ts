import { toString as mdastToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function remarkReadingTime() {
	// @ts-expect-error:next-line
	return (tree, { data }) => {
		const textOnPage = mdastToString(tree);
		const readingTime = getReadingTime(textOnPage);
		// data.astro.frontmatter.readingTime = readingTime.text;
		data.astro.frontmatter.readingTime = "总字数" + readingTime.words + "，阅读预计耗时 " + parseInt(readingTime.minutes+1+'') + " 分钟";
	};
}
