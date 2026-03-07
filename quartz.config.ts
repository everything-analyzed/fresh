import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "everything, analyzed.",
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
     light: "#faf9f6",          // Your Parchment background
  lightgray: "#f1f2e1",      // Pale Olive (Tag Cards)
  gray: "#909090",           // Sagey-Olive (Metadata/Dates)
  darkgray: "#424536",       // Dark Moss (Body Text - very readable)
  secondary: "#84a59d",      // Eucalyptus Green (Titles/Links)
  tertiary: "#7d825c",       // Deep Olive (Hover state)
  highlight: "rgba(132, 165, 157, 0.2)", // Olive-tinted highlight
},
    darkMode: {
      light: "#121412",
      lightgray: "#1a1c1a",
      gray: "#646464",
      darkgray: "#d1d1cc",
      dark: "#ebebeb",
      secondary: "#a3b3a3",
      tertiary: "#84a59d",
      highlight: "rgba(143, 159, 169, 0.15)",
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
      Plugin.Description({ descriptionLength: 150 }),
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