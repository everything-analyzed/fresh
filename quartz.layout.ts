import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.Breadcrumbs()),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    
  ],
  left: [
  // Title stays first for both
  // Component.MobileOnly(Component.PageTitle()),
  Component.DesktopOnly(Component.PageTitle()),
  Component.MobileOnly(Component.Spacer()),

  

  // Desktop search/moon row
  Component.DesktopOnly(
    Component.Flex({
      direction: "row",
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    })
  ),

  // Your exact graph settings kept here
  Component.DesktopOnly(Component.Graph({
    localGraph: {
      opacityScale: 3,
      fontSize: 0.6,
    },
    globalGraph: {
      opacityScale: 3,
      fontSize: 0.6,
    },
  }),
  ),

  // Your exact explorer settings kept here
  Component.Explorer({
    title: "Explorer",
    folderClickBehavior: "link",
    folderDefaultState: "collapsed",
    useSavedState: true,
    displayClass: "desktop-only",
    mapFn: (node) => {
      node.displayName = node.displayName
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    },
  }),
  // Mobile search/moon row
  Component.MobileOnly(
    Component.Flex({
      direction: "row",
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    })
  ),
],
  afterBody: [
    (props) => props.fileData.slug === "index" 
      ? Component.RecentNotes({ 
          title: "Recently Pollinated 🐝",
          showDescription: true, 
          limit: 4 
        })(props) 
      : null,
    Component.Backlinks({
  showExcerpts: true, // This enables the text snippets
}),
Component.TagList(),
// Your exact graph settings kept here
  Component.MobileOnly(Component.Graph({
    localGraph: {
      opacityScale: 3,
      fontSize: 0.6,
    },
    globalGraph: {
      opacityScale: 3,
      fontSize: 0.6,
    },
  }),
  ),
  
Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [   
    
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.DesktopOnly( // <--- Wrap the whole logic block
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    })
  ),
  ],
  left: [
   Component.MobileOnly(Component.PageTitle()), // <--- wrap this
    Component.DesktopOnly(Component.PageTitle()), // <--- add this wrapped version
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      direction: "row",
      align: "center",
      gap: "1rem",
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({ folderClickBehavior: "link" }),
  ],
  afterBody: [
    (props) => props.fileData.slug === "index" 
      ? Component.RecentNotes({ 
          title: "Recent Analysis",
          showDescription: true, 
          limit: 4 
        })(props) 
      : null,
  ],
  center: [
    Component.FolderContent({ showDescription: true }),
  ],
  right: [],
}
