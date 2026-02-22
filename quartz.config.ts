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
  light: "#efeeea",       // page background
  lightgray: "#fdfdfc",   // panel background
  gray: "#b8b4af",        
  darkgray: "#4a4846",    
  dark: "#2b2a29",        
  secondary: "#5d676f",   
  tertiary: "#8a959e",    
  highlight: "rgba(93, 103, 111, 0.07)",
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