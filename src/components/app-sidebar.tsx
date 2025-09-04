import * as React from "react"
import { LayoutDashboard, FolderKanban, FileText, Settings, Wrench, GalleryVerticalEnd, Map, PieChart, Search } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { SearchForm } from "./search-form"

// This is sample data.
const data = {
  user: {
    name: "Shubham Wankhede",
    email: "shubhamwan10@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Munify",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      items: [
        { title: "Overview", url: "/" },
      ],
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FolderKanban,
      items: [
        { title: "All Projects", url: "/projects" },
        { title: "Active", url: "/projects/active" },
        { title: "Archived", url: "/projects/archived" },
      ],
    },
    {
      title: "Docs",
      url: "/settings",
      icon: FileText,
      items: [
        { title: "Settings", url: "/settings" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        { title: "General", url: "/settings" },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "/projects",
      icon: Wrench,
    },
    {
      name: "Sales & Marketing",
      url: "/projects/active",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "/projects/archived",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  const filteredNavMain = data.navMain.map((section) => ({
    ...section,
    items: section.items?.filter((i) => i.title.toLowerCase().includes(q)),
  }))
  const filteredProjects = data.projects.filter((p) => p.name.toLowerCase().includes(q))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <div className="group-data-[collapsible=icon]:hidden">
          <SearchForm value={query} onChange={setQuery} />
        </div>
       
      
       
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        <NavProjects projects={filteredProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
