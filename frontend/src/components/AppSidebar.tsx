import {
  Leaf,
  Video,
  MessageCircle,
  FileText,
  Bell,
  BarChart3,
  CloudSun,
  Info,
  Phone,
  MapPin,
  Gift,
  CalendarDays,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainNav = [
  { titleKey: "nav.leafDiagnosis", url: "/", icon: Leaf },
  { titleKey: "nav.videoScan", url: "/video-scan", icon: Video },
  { titleKey: "nav.advisory", url: "/advisory", icon: MessageCircle },
  { titleKey: "nav.report", url: "/report", icon: FileText },
  { titleKey: "nav.cropCalendar", url: "/crop-calendar", icon: CalendarDays },
  { titleKey: "nav.alerts", url: "/alerts", icon: Bell },
  { titleKey: "nav.mandi", url: "/mandi", icon: BarChart3 },
  { titleKey: "nav.weather", url: "/weather", icon: CloudSun },
  { titleKey: "nav.about", url: "/about", icon: Info },
];

export function AppSidebar() {
  const { t } = useLanguage();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="px-4 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <p className="text-sm font-bold text-sidebar-foreground">TechVerse AI</p>
              <p className="text-[10px] text-muted-foreground">{t("sidebar.portalName")}</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            {t("nav.navigation")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{t(item.titleKey)}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            {t("nav.quickAccess")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-3 space-y-2">
              <div className="gov-card !p-3 flex items-center gap-2 text-xs">
                <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">{t("widget.helpline")}</p>
                  <p className="text-muted-foreground">1800-180-1551</p>
                </div>
              </div>
              <div className="gov-card !p-3 flex items-center gap-2 text-xs">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">{t("widget.krishiKendra")}</p>
                  <p className="text-muted-foreground">{t("widget.findLocation")}</p>
                </div>
              </div>
              <div className="gov-card !p-3 flex items-center gap-2 text-xs">
                <Gift className="h-3.5 w-3.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">{t("widget.govSchemes")}</p>
                  <p className="text-muted-foreground">{t("widget.schemes")}</p>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-4 py-3">
        <p className="text-[10px] text-muted-foreground text-center">
          {t("widget.digitalIndia")}<br />
          {t("widget.ministry")}
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
