import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import api from './api'
let siteUrl = 'http://localhost:4321'
let apiUrl = 'http://localhost:8088'
// console.log(import.meta.env, 'import.meta.env');

if (import.meta.env.PROD) {
	apiUrl = 'https://ai.boycot.top'
	siteUrl = 'https://boycot.top'
}	
export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "Boycot",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "zh-CN",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	// Used as the default description meta property and webmanifest description
	description: "Astro blog",
	// HTML lang property, found in src/layouts/Base.astro L:18 & astro.config.ts L:48
	lang: "zh-CN",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "zh_CN",
	// Used to construct the meta title property found in src/components/BaseHead.astro L:11, and webmanifest name found in astro.config.ts L:42
	title: "每日手记",
	// ! Please remember to replace the following site property with your own domain, used in astro.config.ts
	url: siteUrl,
	social: {
		github: "https://github.com/boycot2015",
		rss: "/rss.xml",
	},
	apiUrl,
	// 播放器配置
	aplayer: false,
	// aplayer: {
	// 	id: '',
	// 	autoPlay: true,
	// 	loop: false,
	// 	preload: true,
	// },
	$api: api
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string;hideInFooter?: boolean;component?: boolean }[] = [
	{
		path: "/",
		title: "首页",
	},
	{
		path: "/posts/",
		title: "文章",
	},
	{
		path: "/notes/",
		title: "笔记",
	},
	{
		path: "/about/",
		title: "关于",
		hideInFooter: true,
	},
	{
		path: "/links/",
		title: "友链",
	},
	{
		path: "/eBook/",
		title: "电子书",
		hideInFooter: true,
	},
	{
		path: "/aichat/",
		title: "AI",
	}
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "8px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["github-dark", "github-light"],
	useThemedScrollbars: false,
};
