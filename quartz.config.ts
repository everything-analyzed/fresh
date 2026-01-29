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
    baseUrl: "github.com/everything-analyzed/fresh",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
  header: "Inter",
  body: "Inter",
  code: "IBM Plex Mono",
},
    colors: {
  lightMode: {
    light: "#f0f0f0",       // Soft gray desk background
    lightgray: "#e8e8e8",   // Border color
    gray: "#b0b0b0",
    darkgray: "#4a4a4a",    // Soft text color
    dark: "#3d5261",        // Slate blue headings
    secondary: "#5a7a91",   // Muted blue link
    tertiary: "#8095a6",
    highlight: "rgba(61, 82, 97, 0.05)",
  },
  darkMode: {
    light: "#1a1a1a",       // Dark background
    lightgray: "#2d2d2d",
    gray: "#646464",
    darkgray: "#d4d4d4",
    dark: "#8095a6",        // Headings (Steel Blue)
    secondary: "#8095a6",   // Links
    tertiary: "#9cb0bf",
    highlight: "rgba(128, 149, 166, 0.15)",
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
      Plugin.Description({descriptionLength: 300,}),
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
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
