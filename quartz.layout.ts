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
  Component.DesktopOnly(Component.PageTitle()),
  Component.MobileOnly(Component.Spacer()),
  
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
  Component.DesktopOnly(
    Component.Flex({
      direction: "row",
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    })
  ),  
  Component.DesktopOnly(Component.TableOfContents()),
  Component.MobileOnly(Component.TagList()),
    Component.DesktopOnly(Component.Explorer({
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
  ),

 
  Component.MobileOnly(
    Component.Flex({
      direction: "row",
      components: [
        { Component: Component.Search(), grow: false },
        { Component: Component.Darkmode() },
      ],
    })
  ),
     
],
  afterBody: [
     Component.MobileOnly(Component.TagList()),
    Component.Backlinks({
      showExcerpts: true, 
    }),
   
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
    Component.MobileOnly(Component.Explorer({
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
    ),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [ 
    
    // Moved from afterBody to here!
    Component.RecentNotes({ 
          title: "Recently Pollinated 🐝",
          showDescription: true, 
          limit: 4 
        }),
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
  right: [
    // Moved from afterBody to here!
     Component.RecentNotes({ 
          title: "Recently Pollinated 🐝",
          showDescription: true, 
          limit: 4 
        }),

     Component.DesktopOnly(Component.Explorer({
    title: "Explorer",
    folderClickBehavior: "link",
    folderDefaultState: "collapsed",
    useSavedState: true,
    displayClass: "mobile-only",
    mapFn: (node) => {
      node.displayName = node.displayName
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    },
  }),
  ),

  ],
}
