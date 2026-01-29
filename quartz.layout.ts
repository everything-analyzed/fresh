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
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      direction: "row", // <--- This is the essential addition
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
  title: "Explorer",
  folderClickBehavior: "link",
  folderDefaultState: "collapsed",
  useSavedState: true,
  displayClass: "desktop-only", // <--- This is the magic line
  mapFn: (node) => {
    node.displayName = node.displayName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
  },
}),
  ],
  afterBody: [Component.RecentNotes({ showDescription: true }),
  Component.Backlinks(),],
  right: [
    Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 1,
        fontSize: 0.6,
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        fontSize: 0.6,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
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
  right: [],
  center: [
    Component.FolderContent({ showDescription: true }), // <--- Add it here too
  ],
}
