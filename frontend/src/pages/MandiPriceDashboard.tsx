import { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Minus, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const mandiData = [
  { crop: "Tomato", market: "Rajkot APMC", price: 28, trend: "up" },
  { crop: "Tomato", market: "Ahmedabad APMC", price: 32, trend: "up" },
  { crop: "Potato", market: "Deesa Mandi", price: 14, trend: "down" },
  { crop: "Onion", market: "Mahuva APMC", price: 18, trend: "stable" },
  { crop: "Wheat", market: "Unjha Mandi", price: 24, trend: "up" },
  { crop: "Cotton", market: "Gondal APMC", price: 62, trend: "down" },
  { crop: "Groundnut", market: "Junagadh APMC", price: 56, trend: "stable" },
  { crop: "Chilli", market: "Unjha Mandi", price: 120, trend: "up" },
];

const MandiPriceDashboard = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedState, setSelectedState] = useState("Gujarat");

  const filteredData = selectedCrop === "All" ? mandiData : mandiData.filter((d) => d.crop === selectedCrop);
  const crops = ["All", ...new Set(mandiData.map((d) => d.crop))];

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-primary" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const trendLabel = (trend: string) => t(`mandi.${trend}`);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="gov-section-title flex items-center gap-2">
          <BarChart3 className="h-5 w-5" /> {t("mandi.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("mandi.subtitle")}</p>
      </div>

      <div className="gov-card flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">{t("mandi.selectCrop")}</label>
          <div className="relative">
            <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} className="bg-background border border-input rounded-md px-3 py-2 text-sm pr-8 appearance-none">
              {crops.map((c) => <option key={c} value={c}>{c === "All" ? t("mandi.all") : c}</option>)}
            </select>
            <ChevronDown className="h-4 w-4 absolute right-2 top-2.5 pointer-events-none text-muted-foreground" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">{t("mandi.selectState")}</label>
          <div className="relative">
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="bg-background border border-input rounded-md px-3 py-2 text-sm pr-8 appearance-none">
              <option>Gujarat</option>
              <option>Maharashtra</option>
              <option>Rajasthan</option>
              <option>Madhya Pradesh</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-2 top-2.5 pointer-events-none text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="gov-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead><tr><th>{t("mandi.crop")}</th><th>{t("mandi.market")}</th><th>{t("mandi.price")}</th><th>{t("mandi.trend")}</th></tr></thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={i}>
                  <td className="font-medium">{row.crop}</td>
                  <td>{row.market}</td>
                  <td className="font-semibold">₹{row.price}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <TrendIcon trend={row.trend} />
                      <span className="text-xs">{trendLabel(row.trend)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">{t("mandi.footer")}</p>
    </div>
  );
};

export default MandiPriceDashboard;
