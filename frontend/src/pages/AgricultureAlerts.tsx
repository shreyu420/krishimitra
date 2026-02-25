import { useEffect, useState } from "react";
import { Bell, AlertTriangle, Bug, Droplets, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiRequest } from "@/lib/api";

type Alert = {
  id: number;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  date: string;
  sourceUrl?: string;
};

const iconMap = {
  high: AlertTriangle,
  medium: Bug,
  low: Droplets,
};

const AgricultureAlerts = () => {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    apiRequest<{ alerts: Alert[] }>("/api/alerts")
      .then((data) => setAlerts(data.alerts))
      .catch(() => setAlerts([]));
  }, []);

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
          {alerts.map((alert) => {
            const Icon = iconMap[alert.severity] || AlertTriangle;
            return (
              <div key={alert.id} className={`gov-alert-card !border-l-4 ${severityStyles[alert.severity]}`}>
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${alert.severity === "high" ? "text-destructive" : alert.severity === "medium" ? "text-gov-orange" : "text-primary"}`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold">{alert.title}</h4>
                      <span className={`gov-badge ${severityBadge[alert.severity]}`}>{t(severityLabel[alert.severity])}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(alert.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("alerts.news")}</h3>
        <div className="divide-y divide-border">
          {alerts.map((alert) => (
            <div key={`news-${alert.id}`} className="py-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{alert.title}</p>
                <p className="text-xs text-muted-foreground">{new Date(alert.date).toLocaleDateString()}</p>
              </div>
              <a href={alert.sourceUrl} target="_blank" rel="noreferrer" className="gov-btn-outline !py-1 !px-3 text-xs flex items-center gap-1 shrink-0">
                {t("alerts.readMore")} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgricultureAlerts;
