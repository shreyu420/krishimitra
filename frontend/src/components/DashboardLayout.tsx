import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AccessibilityToolbar from "./AccessibilityToolbar";
import { Menu, Globe } from "lucide-react";
import { useLanguage, langLabels } from "@/contexts/LanguageContext";
import AuthPanel from "./AuthPanel";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { lang, setLang, t } = useLanguage();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="gov-header flex items-center justify-between gap-3 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-primary-foreground">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <div className="flex items-center gap-3">
                <span className="text-xl">🌾</span>
                <div>
                  <h1 className="text-base font-bold leading-tight">{t("header.title")}</h1>
                  <p className="text-xs opacity-80">{t("header.subtitle")}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <AuthPanel />
              <div className="flex items-center gap-1.5 shrink-0">
              <Globe className="h-3.5 w-3.5 text-primary-foreground" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="bg-primary-foreground/10 border border-primary-foreground/30 rounded px-2 py-1 text-xs font-medium text-primary-foreground appearance-none cursor-pointer focus:outline-none"
              >
                {Object.entries(langLabels).map(([code, label]) => (
                  <option key={code} value={code} className="text-foreground bg-background">
                    {label}
                  </option>
                ))}
              </select>
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
          <footer className="border-t border-border px-4 py-3 text-xs text-muted-foreground text-center bg-card">
            {t("footer.text")}
            <span className="font-medium"> {t("footer.helpline")}</span>
          </footer>
        </div>
        <AccessibilityToolbar />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
