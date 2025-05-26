import OPPOSansRegular from 'public/font/OPPOSans-Regular.woff'
import OPPOSansMedium from 'public/font/OPPOSans-Medium.woff'
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site.config";
import { getFormattedDate } from "@/utils/date";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext, InferGetStaticPropsType } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
// import { promises } from 'fs'
// import { join } from 'path'
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const bgColors = ['#2bbc89', '#c9cacc', '#ff5733', '#33c1ff', '#ffc733', '#33ff57', '#ff33a1'];
const markup = (title: string, pubDate: string) => {
	return html`<div tw="flex flex-col w-full h-full bg-[${bgColors[Math.floor(Math.random() * bgColors.length) - 1]}]">
	<div tw="flex flex-col flex-1 w-full p-10 justify-center">
		<p tw="text-2xl mb-6">${pubDate}</p>
		<h1 tw="text-6xl font-bold leading-snug">${title}</h1>
	</div>
	<div tw="flex items-center justify-between w-full p-10 border-t border-white text-xl">
		<div tw="flex items-center">
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 24 24" 
			fill="none"
			stroke="currentColor" 
			stroke-width="2.2"
			class="inline-block h-8 w-8 mr-2"
		>
			<path 
				stroke-linecap="round" 
				stroke-linejoin="round" 
				d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" 
			/>
		</svg>
		<p tw="ml-3 font-semibold">${siteConfig.title}</p>
		</div>
		<p>${siteConfig.author}</p>
		</div>
		</div>`
		};
			// <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="currentColor" d="M8.8 19q-.825 0-1.412-.587T6.8 17V7q0-.825.588-1.412T8.8 5h3.525q1.625 0 3 1T16.7 8.775q0 1.275-.575 1.963t-1.075.987q.625.275 1.388 1.025T17.2 15q0 2.225-1.625 3.113t-3.05.887zm1.025-2.8h2.6q1.2 0 1.463-.612t.262-.888t-.262-.887t-1.538-.613H9.825zm0-5.7h2.325q.825 0 1.2-.425t.375-.95q0-.6-.425-.975t-1.1-.375H9.825z"/></svg>

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
	const { pubDate, title } = context.props as Props;
	const postDate = getFormattedDate(pubDate, {
		month: "long",
		weekday: "long",
	});
	const ogOptions: SatoriOptions = {
		// debug: true,
		fonts: [
			{
				// data: await fetch('https://dsfs.oppo.com/store/public/font/OPPOSans-Regular.woff').then(res => res.arrayBuffer()),
				data: Buffer.from(OPPOSansRegular),
				name: "OPPOSans-Regular",
				style: "normal",
				weight: 400,
			},
			{
				// data: await fetch('https://dsfs.oppo.com/store/public/font/OPPOSans-Medium.woff').then(res => res.arrayBuffer()),
				data: Buffer.from(OPPOSansMedium),
				name: "OPPOSans-Medium",
				style: "normal",
				weight: 700,
			}
		],
		height: 630,
		width: 1200,
		// embedFont: false
	};
	// social-card
	// const svg = await satori(html`<div tw="flex border border-[#2bbc89] justify-center w-full h-full bg-[#1d1f21] text-[#c9cacc]">
	// 	<div tw="flex items-center ml-[-60px]">
	// 		<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 24 24"><path fill="currentColor" d="M8.8 19q-.825 0-1.412-.587T6.8 17V7q0-.825.588-1.412T8.8 5h3.525q1.625 0 3 1T16.7 8.775q0 1.275-.575 1.963t-1.075.987q.625.275 1.388 1.025T17.2 15q0 2.225-1.625 3.113t-3.05.887zm1.025-2.8h2.6q1.2 0 1.463-.612t.262-.888t-.262-.887t-1.538-.613H9.825zm0-5.7h2.325q.825 0 1.2-.425t.375-.95q0-.6-.425-.975t-1.1-.375H9.825z"/></svg>
	// 	</div>
	// 	<div tw="flex flex-col justify-center">
	// 		<h1 tw="text-8xl font-bold leading-snug text-white">${siteConfig.title}</h1>
	// 		<p tw="text-4xl font-semibold">Powered by ${siteConfig.author} © 2025</p>
	// 	</div>
	// </div>`, ogOptions);
	const svg = await satori(markup(title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();
	// preview
	// await promises.writeFile(join(__dirname, './_social-card.png'), png)
	return new Response(png, {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	return posts
		.filter(({ data }) => !data.ogImage)
		.map((post) => ({
			params: { slug: post.id },
			props: {
				pubDate: post.data.updatedDate ?? post.data.publishDate,
				title: post.data.title,
			},
		}));
}
