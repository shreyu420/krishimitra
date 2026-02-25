import { useEffect, useMemo, useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Minus, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiRequest } from "@/lib/api";

type Price = {
  id: number;
  crop: string;
  market: string;
  state: string;
  price: number;
  trend: "up" | "down" | "stable";
  updatedAt: string;
};

const MandiPriceDashboard = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedState, setSelectedState] = useState("Gujarat");
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    const query = new URLSearchParams({ state: selectedState });
    if (selectedCrop !== "All") query.set("crop", selectedCrop);

    apiRequest<{ prices: Price[] }>(`/api/mandi-prices?${query.toString()}`)
      .then((res) => setPrices(res.prices))
      .catch(() => setPrices([]));
  }, [selectedCrop, selectedState]);

  const crops = useMemo(() => ["All", ...new Set(prices.map((d) => d.crop))], [prices]);

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
            <ChevronDown className="h-4 w-4 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">{t("mandi.selectState")}</label>
          <div className="relative">
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="bg-background border border-input rounded-md px-3 py-2 text-sm pr-8 appearance-none">
              <option value="Gujarat">Gujarat</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="gov-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead><tr><th>{t("mandi.crop")}</th><th>{t("mandi.market")}</th><th>{t("mandi.price")}</th><th>{t("mandi.trend")}</th><th>{t("mandi.updated")}</th></tr></thead>
            <tbody>
              {prices.map((item) => (
                <tr key={item.id}>
                  <td>{item.crop}</td>
                  <td>{item.market}</td>
                  <td>₹{item.price}/kg</td>
                  <td><span className="inline-flex items-center gap-1"><TrendIcon trend={item.trend} /> {trendLabel(item.trend)}</span></td>
                  <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MandiPriceDashboard;
