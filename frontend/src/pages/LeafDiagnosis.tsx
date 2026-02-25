import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, Download, Volume2, VolumeX, Share2, AlertTriangle, CheckCircle, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

const LeafDiagnosis = () => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const { t, lang } = useLanguage();
  const { token } = useAuth();
  const [saveMessage, setSaveMessage] = useState("");
  const { speak, stop, isSpeaking } = useTextToSpeech(lang);

  const handleVoiceAdvisory = () => {
    if (isSpeaking) { stop(); return; }
    const text = `${t("leaf.healthIndex")}: 82/100. ${t("leaf.earlyBlight")}, ${t("leaf.confidence")} 78%. ${t("leaf.advisory")}. ${t("leaf.prev1")}. ${t("leaf.prev2")}. ${t("leaf.prev3")}. ${t("leaf.prev4")}.`;
    speak(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="gov-section-title flex items-center gap-2">
          <Leaf className="h-5 w-5" /> {t("leaf.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("leaf.subtitle")}</p>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("leaf.uploadTitle")}</h3>
        <div className="gov-upload-box" onClick={async () => {
          setImageUploaded(true);
          if (!token) {
            setSaveMessage("Login to store diagnosis history.");
            return;
          }
          try {
            await apiRequest("/api/diagnoses", {
              method: "POST",
              token,
              body: {
                crop: "Tomato",
                disease: "Early Blight",
                confidence: 78,
                severity: "moderate",
                advisory: "Spray Mancozeb 2g/L every 7 days and monitor fungal spread.",
              },
            });
            setSaveMessage("Diagnosis saved to your account.");
          } catch (error) {
            setSaveMessage(error instanceof Error ? error.message : "Unable to save diagnosis");
          }
        }}>
          <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">{t("leaf.uploadText")}</p>
          <p className="text-xs text-muted-foreground mt-1">{t("leaf.uploadFormat")}</p>
        </div>
        {imageUploaded && (
          <div className="mt-4 p-3 bg-accent rounded-md text-sm text-accent-foreground flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            {t("leaf.uploadSuccess")}
          </div>
        )}
        {saveMessage && <p className="text-xs text-muted-foreground mt-2">{saveMessage}</p>}
      </div>

      {imageUploaded && (
        <>
          <div className="gov-card flex flex-col sm:flex-row items-center gap-6">
            <div className="gov-score-ring">82<span className="text-sm font-normal">/100</span></div>
            <div>
              <h3 className="text-base font-semibold">{t("leaf.healthIndex")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("leaf.healthDesc")}</p>
              <div className="mt-2 w-full bg-muted rounded-full h-3 max-w-xs">
                <div className="bg-primary h-3 rounded-full" style={{ width: "82%" }}></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="gov-card border-l-4 !border-l-destructive">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("leaf.primaryPred")}</p>
              <h3 className="text-lg font-bold text-foreground">{t("leaf.earlyBlight")}</h3>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm"><span>{t("leaf.confidence")}</span><span className="font-semibold">78%</span></div>
                <div className="w-full bg-muted rounded-full h-2"><div className="bg-gov-orange h-2 rounded-full" style={{ width: "78%" }}></div></div>
              </div>
              <p className="mt-2 text-sm"><span className="gov-badge-orange">{t("leaf.severityModerate")}</span></p>
            </div>
            <div className="gov-card border-l-4 !border-l-gov-yellow">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("leaf.secondOpinion")}</p>
              <h3 className="text-lg font-bold text-foreground">{t("leaf.leafCurl")}</h3>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm"><span>{t("leaf.confidence")}</span><span className="font-semibold">15%</span></div>
                <div className="w-full bg-muted rounded-full h-2"><div className="bg-gov-yellow h-2 rounded-full" style={{ width: "15%" }}></div></div>
              </div>
              <p className="mt-2 text-sm"><span className="gov-badge-green">{t("leaf.severityLow")}</span></p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-accent rounded-md text-sm">
            <AlertTriangle className="h-4 w-4 text-gov-orange mt-0.5 shrink-0" />
            <span><strong>⚠️</strong> {t("leaf.advisory")}</span>
          </div>

          <div className="gov-card">
            <h3 className="text-sm font-semibold mb-3">{t("leaf.treatment")}</h3>
            <div className="overflow-x-auto">
              <table className="gov-table">
                <thead><tr><th>{t("leaf.issueDetected")}</th><th>{t("leaf.recommendedSpray")}</th><th>{t("leaf.dose")}</th><th>{t("leaf.interval")}</th></tr></thead>
                <tbody>
                  <tr><td>{t("leaf.earlyBlight")}</td><td>Mancozeb</td><td>2g/L</td><td>{t("leaf.every7")}</td></tr>
                  <tr><td>{t("leaf.fungalInfection")}</td><td>Copper Oxychloride</td><td>3g/L</td><td>{t("leaf.every10")}</td></tr>
                  <tr><td>{t("leaf.nutrientDeficiency")}</td><td>NPK 19:19:19</td><td>5g/L</td><td>{t("leaf.every15")}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="gov-card">
            <h3 className="text-sm font-semibold mb-3">{t("leaf.gradcam")}</h3>
            <div className="bg-muted rounded-md p-8 text-center">
              <div className="w-48 h-48 mx-auto bg-accent rounded-md flex items-center justify-center border border-border">
                <span className="text-sm text-muted-foreground">{t("leaf.heatmap")}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t("leaf.heatmapDesc")}</p>
            </div>
          </div>

          <div className="gov-card">
            <h3 className="text-sm font-semibold mb-3">{t("leaf.preventive")}</h3>
            <ul className="space-y-2 text-sm">
              {["leaf.prev1", "leaf.prev2", "leaf.prev3", "leaf.prev4"].map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="gov-btn-primary flex items-center gap-2"><Download className="h-4 w-4" /> {t("leaf.downloadPdf")}</button>
            <button className="gov-btn-outline flex items-center gap-2" onClick={handleVoiceAdvisory}>
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isSpeaking ? t("leaf.stopVoice") : t("leaf.voiceAdvisory")}
            </button>
            <button className="gov-btn-whatsapp flex items-center gap-2"><Share2 className="h-4 w-4" /> {t("leaf.shareWhatsapp")}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default LeafDiagnosis;
