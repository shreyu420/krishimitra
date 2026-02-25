import { Bell, AlertTriangle, Bug, Droplets, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AgricultureAlerts = () => {
  const { t } = useLanguage();

  const alerts = [
    { severity: "high", icon: AlertTriangle, titleKey: "alerts.alert1.title", descKey: "alerts.alert1.desc", date: "19 Feb 2026" },
    { severity: "medium", icon: Bug, titleKey: "alerts.alert2.title", descKey: "alerts.alert2.desc", date: "18 Feb 2026" },
    { severity: "low", icon: Droplets, titleKey: "alerts.alert3.title", descKey: "alerts.alert3.desc", date: "17 Feb 2026" },
  ];

  const newsKeys = ["alerts.news1", "alerts.news2", "alerts.news3", "alerts.news4", "alerts.news5"];
  const newsDates = ["19 Feb 2026", "18 Feb 2026", "17 Feb 2026", "16 Feb 2026", "15 Feb 2026"];

  const severityStyles: Record<string, string> = {
    high: "border-l-destructive",
    medium: "border-l-gov-orange",
    low: "border-l-primary",
  };

  const severityBadge: Record<string, string> = {
    high: "gov-badge-red",
    medium: "gov-badge-orange",
    low: "gov-badge-green",
  };

  const severityLabel: Record<string, string> = {
    high: "common.high",
    medium: "common.medium",
    low: "common.low",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="gov-section-title flex items-center gap-2">
          <Bell className="h-5 w-5" /> {t("alerts.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("alerts.subtitle")}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">{t("alerts.priority")}</h3>
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div key={i} className={`gov-alert-card !border-l-4 ${severityStyles[alert.severity]}`}>
              <div className="flex items-start gap-3">
                <alert.icon className={`h-5 w-5 shrink-0 mt-0.5 ${alert.severity === "high" ? "text-destructive" : alert.severity === "medium" ? "text-gov-orange" : "text-primary"}`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold">{t(alert.titleKey)}</h4>
                    <span className={`gov-badge ${severityBadge[alert.severity]}`}>{t(severityLabel[alert.severity])}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t(alert.descKey)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("alerts.news")}</h3>
        <div className="divide-y divide-border">
          {newsKeys.map((key, i) => (
            <div key={key} className="py-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{t(key)}</p>
                <p className="text-xs text-muted-foreground">{newsDates[i]}</p>
              </div>
              <button className="gov-btn-outline !py-1 !px-3 text-xs flex items-center gap-1 shrink-0">
                {t("alerts.readMore")} <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgricultureAlerts;
