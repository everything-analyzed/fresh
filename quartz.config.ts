import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Everything, Analyzed.",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "github.com/everything-analyzed.io/fresh",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
  fontOrigin: "googleFonts",
  cdnCaching: true,
  typography: {
    header: "Inter", // Matches your SCSS serif choice
    body: "Inter",
    code: "IBM Plex Mono",
  },
  colors: {
  lightMode: {
    light: "#faf9f6",       // warm parchment
    lightgray: "#f0eee9",   // soft sand
    gray: "#8a8682",        // warm stone
    darkgray: "#4f4c4a",    // earthy charcoal
    dark: "#3d3a38",        // deep coffee
    secondary: "#8095a6",   // your steel blue
    tertiary: "#a3b1bc",    // soft sky stone
    highlight: "rgba(128, 149, 166, 0.12)",
  },
  darkMode: {
    light: "#121110",       // warm off-black
    lightgray: "#2d2b2a",   // dark cocoa
    gray: "#66625f",        // muted taupe
    darkgray: "#d6d3d0",    // soft warm silver
    dark: "#e8e6e3",        // creamy light gray
    secondary: "#a3b1bc",   // soft sky stone
    tertiary: "#8095a6",    // steel blue
    highlight: "rgba(163, 177, 188, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description({ descriptionLength: 300 }),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config