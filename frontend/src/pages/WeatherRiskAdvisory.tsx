import { useEffect, useState } from "react";
import { CloudSun, MapPin, Droplets, Bug, Wind, Thermometer, AlertTriangle, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { apiRequest } from "@/lib/api";

type WeatherData = {
  location: string;
  temperature: string;
  humidity: string;
  wind: string;
  forecast: string;
};

const WeatherRiskAdvisory = () => {
  const { t, lang } = useLanguage();
  const { speak, stop, isSpeaking } = useTextToSpeech(lang);
  const [location, setLocation] = useState("Rajkot, Gujarat");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = () => {
    apiRequest<WeatherData>(`/api/weather?location=${encodeURIComponent(location)}`)
      .then((res) => setWeather(res))
      .catch(() => setWeather(null));
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleVoice = () => {
    if (isSpeaking) { stop(); return; }
    const text = `${t("weather.title")}. ${t("weather.fungalRisk")}: ${t("weather.fungalDesc")}. ${t("weather.tip1")}. ${t("weather.tip2")}. ${t("weather.tip3")}.`;
    speak(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="gov-section-title flex items-center gap-2">
          <CloudSun className="h-5 w-5" /> {t("weather.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("weather.subtitle")}</p>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("weather.location")}</h3>
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          <button className="gov-btn-primary flex items-center gap-1" onClick={fetchWeather}><MapPin className="h-4 w-4" /> {t("weather.locate")}</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Thermometer, label: t("weather.temperature"), value: weather?.temperature ?? "--", sub: t("weather.tempRange") },
          { icon: Droplets, label: t("weather.humidity"), value: weather?.humidity ?? "--", sub: t("weather.humidityDesc") },
          { icon: Wind, label: t("weather.wind"), value: weather?.wind ?? "--", sub: t("weather.windDir") },
          { icon: CloudSun, label: t("weather.forecast"), value: weather?.forecast ?? "--", sub: t("weather.forecastDesc") },
        ].map((item, i) => (
          <div key={i} className="gov-card text-center">
            <item.icon className="h-6 w-6 mx-auto text-primary mb-1" />
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-lg font-bold">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.sub}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">{t("weather.riskAlerts")}</h3>
        <div className="space-y-3">
          <div className="gov-alert-card !border-l-4 border-l-destructive"><div className="flex items-start gap-3"><Droplets className="h-5 w-5 text-destructive shrink-0 mt-0.5" /><div><h4 className="text-sm font-semibold">{t("weather.fungalRisk")}</h4><p className="text-sm text-muted-foreground mt-1">{t("weather.fungalDesc")}</p></div><span className="gov-badge-red shrink-0">{t("common.high")}</span></div></div>
          <div className="gov-alert-card !border-l-4 border-l-gov-orange"><div className="flex items-start gap-3"><Bug className="h-5 w-5 text-gov-orange shrink-0 mt-0.5" /><div><h4 className="text-sm font-semibold">{t("weather.pestRisk")}</h4><p className="text-sm text-muted-foreground mt-1">{t("weather.pestDesc")}</p></div><span className="gov-badge-orange shrink-0">{t("common.medium")}</span></div></div>
          <div className="gov-alert-card !border-l-4 border-l-primary"><div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" /><div><h4 className="text-sm font-semibold">{t("weather.irrigationTitle")}</h4><p className="text-sm text-muted-foreground mt-1">{t("weather.irrigationDesc")}</p></div><span className="gov-badge-green shrink-0">{t("common.low")}</span></div></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="gov-btn-outline flex items-center gap-2" onClick={handleVoice}>
          {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {isSpeaking ? t("leaf.stopVoice") : t("leaf.voiceAdvisory")}
        </button>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("weather.weeklyAdvisory")}</h3>
        <div className="space-y-2 text-sm">
          <p>{t("weather.basedOn")} <strong>{weather?.location || location}</strong>:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {["weather.tip1", "weather.tip2", "weather.tip3", "weather.tip4", "weather.tip5"].map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherRiskAdvisory;
