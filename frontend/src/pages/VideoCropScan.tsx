import { useState } from "react";
import { Upload, Download, Share2, Video, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VideoCropScan = () => {
  const [uploaded, setUploaded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="gov-section-title flex items-center gap-2">
          <Video className="h-5 w-5" /> {t("video.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("video.subtitle")}</p>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("video.uploadTitle")}</h3>
        <div className="gov-upload-box" onClick={() => setUploaded(true)}>
          <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">{t("video.uploadText")}</p>
          <p className="text-xs text-muted-foreground mt-1">{t("video.uploadFormat")}</p>
        </div>
      </div>

      {uploaded && (
        <>
          <div className="gov-card">
            <h3 className="text-sm font-semibold mb-3">{t("video.extractedFrames")}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((frame) => (
                <div key={frame} className="bg-muted rounded-md p-4 text-center text-xs text-muted-foreground border border-border">
                  {t("video.frame")} {frame}
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>{t("video.totalFrames")}</strong> {t("video.totalFramesValue")}
            </p>
          </div>

          <div className="gov-card">
            <h3 className="text-sm font-semibold mb-3">{t("video.selectFrame")}</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="bg-card border border-input rounded-md px-3 py-2 text-sm pr-8 appearance-none">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((f) => (
                    <option key={f}>{t("video.frame")} {f}</option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 absolute right-2 top-2.5 pointer-events-none text-muted-foreground" />
              </div>
              <button className="gov-btn-primary text-sm">{t("video.analyzeFrame")}</button>
            </div>
          </div>

          <div className="gov-card border-l-4 !border-l-primary">
            <h3 className="text-sm font-semibold mb-2">{t("video.diagnosisSummary")}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>{t("video.predominant")}</span><span className="font-semibold">{t("video.predominantValue")}</span></div>
              <div className="flex justify-between"><span>{t("video.overallConfidence")}</span><span className="font-semibold">74%</span></div>
              <div className="flex justify-between"><span>{t("video.healthIndex")}</span><span className="font-semibold">68/100</span></div>
              <div className="flex justify-between"><span>{t("video.severity")}</span><span className="gov-badge-orange">{t("common.moderate")}</span></div>
            </div>
          </div>

          <div className="gov-card">
            <h3 className="text-sm font-semibold mb-3">{t("video.gradcam")}</h3>
            <div className="bg-muted rounded-md p-8 text-center">
              <div className="w-48 h-48 mx-auto bg-accent rounded-md flex items-center justify-center border border-border">
                <span className="text-sm text-muted-foreground">{t("common.heatmap")}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t("video.affectedRegion")}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="gov-btn-primary flex items-center gap-2"><Download className="h-4 w-4" /> {t("video.downloadReport")}</button>
            <button className="gov-btn-whatsapp flex items-center gap-2"><Share2 className="h-4 w-4" /> {t("leaf.shareWhatsapp")}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoCropScan;
