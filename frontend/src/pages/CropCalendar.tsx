import { CalendarDays, Sprout, SunMedium, CloudRain, Snowflake, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CropSeason {
  cropKey: string;
  sowKey: string;
  harvestKey: string;
  season: "kharif" | "rabi" | "zaid";
  months: number[];
}

const crops: CropSeason[] = [
  { cropKey: "cal.rice", sowKey: "cal.junJul", harvestKey: "cal.octNov", season: "kharif", months: [6, 7, 8, 9, 10, 11] },
  { cropKey: "cal.cotton", sowKey: "cal.aprMay", harvestKey: "cal.octDec", season: "kharif", months: [4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { cropKey: "cal.wheat", sowKey: "cal.octNov", harvestKey: "cal.marApr", season: "rabi", months: [10, 11, 12, 1, 2, 3, 4] },
  { cropKey: "cal.mustard", sowKey: "cal.octNov", harvestKey: "cal.febMar", season: "rabi", months: [10, 11, 12, 1, 2, 3] },
  { cropKey: "cal.groundnut", sowKey: "cal.junJul", harvestKey: "cal.octNov", season: "kharif", months: [6, 7, 8, 9, 10, 11] },
  { cropKey: "cal.watermelon", sowKey: "cal.febMar", harvestKey: "cal.mayJun", season: "zaid", months: [2, 3, 4, 5, 6] },
  { cropKey: "cal.tomato", sowKey: "cal.octNov", harvestKey: "cal.febMar", season: "rabi", months: [10, 11, 12, 1, 2, 3] },
  { cropKey: "cal.maize", sowKey: "cal.junJul", harvestKey: "cal.sepOct", season: "kharif", months: [6, 7, 8, 9, 10] },
];

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const seasonColors: Record<string, string> = {
  kharif: "bg-primary/20 text-primary",
  rabi: "bg-[hsl(var(--gov-blue)/0.15)] text-[hsl(var(--gov-blue))]",
  zaid: "bg-[hsl(var(--gov-orange)/0.15)] text-[hsl(var(--gov-orange))]",
};

const seasonIcons: Record<string, typeof CloudRain> = {
  kharif: CloudRain,
  rabi: Snowflake,
  zaid: SunMedium,
};

const CropCalendar = () => {
  const { t } = useLanguage();
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="gov-section-title flex items-center gap-2">
          <CalendarDays className="h-5 w-5" /> {t("cal.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("cal.subtitle")}</p>
      </div>

      {/* Current month reminder */}
      <div className="gov-card border-l-4 !border-l-primary">
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold">{t("cal.currentReminder")}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t("cal.currentReminderDesc")}</p>
          </div>
        </div>
      </div>

      {/* Season legend */}
      <div className="flex flex-wrap gap-3">
        {(["kharif", "rabi", "zaid"] as const).map((s) => {
          const Icon = seasonIcons[s];
          return (
            <div key={s} className={`gov-badge ${seasonColors[s]} flex items-center gap-1.5 !px-3 !py-1.5`}>
              <Icon className="h-3.5 w-3.5" />
              {t(`cal.${s}`)}
            </div>
          );
        })}
      </div>

      {/* Timeline table */}
      <div className="gov-card overflow-x-auto">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Sprout className="h-4 w-4" /> {t("cal.timeline")}
        </h3>
        <table className="gov-table text-xs">
          <thead>
            <tr>
              <th className="min-w-[100px]">{t("cal.crop")}</th>
              <th>{t("cal.season")}</th>
              <th>{t("cal.sowing")}</th>
              <th>{t("cal.harvest")}</th>
              {monthLabels.map((m) => (
                <th key={m} className="text-center !px-1 min-w-[32px]">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop.cropKey}>
                <td className="font-semibold">{t(crop.cropKey)}</td>
                <td>
                  <span className={`gov-badge ${seasonColors[crop.season]} text-[10px]`}>
                    {t(`cal.${crop.season}`)}
                  </span>
                </td>
                <td className="text-muted-foreground">{t(crop.sowKey)}</td>
                <td className="text-muted-foreground">{t(crop.harvestKey)}</td>
                {monthLabels.map((_, i) => {
                  const monthNum = i + 1;
                  const active = crop.months.includes(monthNum);
                  const isCurrent = monthNum === currentMonth;
                  return (
                    <td key={i} className="!px-0.5 text-center">
                      {active ? (
                        <div
                          className={`w-6 h-5 mx-auto rounded-sm ${
                            crop.season === "kharif"
                              ? "bg-primary/30"
                              : crop.season === "rabi"
                              ? "bg-[hsl(var(--gov-blue)/0.25)]"
                              : "bg-[hsl(var(--gov-orange)/0.25)]"
                          } ${isCurrent ? "ring-2 ring-primary" : ""}`}
                        />
                      ) : (
                        <div className={`w-6 h-5 mx-auto ${isCurrent ? "border border-dashed border-muted-foreground rounded-sm" : ""}`} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Seasonal tips */}
      <div className="grid md:grid-cols-3 gap-4">
        {(["kharif", "rabi", "zaid"] as const).map((s) => {
          const Icon = seasonIcons[s];
          return (
            <div key={s} className="gov-card">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" /> {t(`cal.${s}Tips`)}
              </h3>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span>
                    {t(`cal.${s}Tip${n}`)}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CropCalendar;
