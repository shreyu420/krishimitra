import { Download, Share2, CheckCircle, FileText, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

const CropHealthReport = () => {
  const { t, lang } = useLanguage();
  const { speak, stop, isSpeaking } = useTextToSpeech(lang);

  const handleVoice = () => {
    if (isSpeaking) { stop(); return; }
    const text = `${t("report.title")}. ${t("leaf.earlyBlight")}, ${t("leaf.confidence")} 78%. ${t("report.check1")}. ${t("report.check2")}. ${t("report.check3")}.`;
    speak(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="gov-section-title flex items-center gap-2">
          <FileText className="h-5 w-5" /> {t("report.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("report.subtitle")}</p>
      </div>

      <div className="gov-card border-t-4 !border-t-primary">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{t("report.reportId")} TVA-2026-0219-001</p>
            <p className="text-xs text-muted-foreground">{t("report.date")} 19 February 2026</p>
            <p className="text-xs text-muted-foreground">{t("report.farmer")} {t("report.sampleFarmer")}</p>
          </div>
          <div className="gov-score-ring">82<span className="text-sm font-normal">/100</span></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="gov-card">
          <h3 className="text-sm font-semibold mb-3">{t("report.latestDiagnosis")}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>{t("report.disease")}</span><span className="font-semibold">{t("leaf.earlyBlight")}</span></div>
            <div className="flex justify-between"><span>{t("leaf.confidence")}:</span><span className="font-semibold">78%</span></div>
            <div className="flex justify-between"><span>{t("video.severity")}</span><span className="gov-badge-orange">{t("common.moderate")}</span></div>
            <div className="flex justify-between"><span>{t("report.cropType")}</span><span className="font-semibold">{t("report.tomato")}</span></div>
          </div>
        </div>
        <div className="gov-card">
          <h3 className="text-sm font-semibold mb-3">{t("report.imageHeatmap")}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-md p-6 text-center text-xs text-muted-foreground border border-border">{t("report.originalLeaf")}</div>
            <div className="bg-muted rounded-md p-6 text-center text-xs text-muted-foreground border border-border">Grad-CAM</div>
          </div>
        </div>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("report.prescription")}</h3>
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead><tr><th>{t("report.issue")}</th><th>{t("report.medicine")}</th><th>{t("leaf.dose")}</th><th>{t("leaf.interval")}</th></tr></thead>
            <tbody>
              <tr><td>{t("leaf.earlyBlight")}</td><td>Mancozeb</td><td>2g/L</td><td>{t("leaf.every7")}</td></tr>
              <tr><td>{t("report.fungalRisk")}</td><td>Copper Oxychloride</td><td>3g/L</td><td>{t("leaf.every10")}</td></tr>
              <tr><td>{t("report.nutrientBoost")}</td><td>NPK 19:19:19</td><td>5g/L</td><td>{t("leaf.every15")}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("report.checklist")}</h3>
        <ul className="space-y-2 text-sm">
          {["report.check1", "report.check2", "report.check3", "report.check4", "report.check5"].map((key) => (
            <li key={key} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary shrink-0" />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="gov-btn-primary flex items-center gap-2"><Download className="h-4 w-4" /> {t("leaf.downloadPdf")}</button>
        <button className="gov-btn-outline flex items-center gap-2" onClick={handleVoice}>
          {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {isSpeaking ? t("leaf.stopVoice") : t("leaf.voiceAdvisory")}
        </button>
        <button className="gov-btn-whatsapp flex items-center gap-2"><Share2 className="h-4 w-4" /> {t("leaf.shareWhatsapp")}</button>
      </div>
    </div>
  );
};

export default CropHealthReport;
