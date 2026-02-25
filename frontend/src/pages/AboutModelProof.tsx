import { Info, Award, CheckCircle, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutModelProof = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="gov-section-title flex items-center gap-2">
          <Info className="h-5 w-5" /> {t("about.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("about.subtitle")}</p>
      </div>

      <div className="gov-card border-t-4 !border-t-gov-yellow bg-accent/30">
        <div className="flex items-start gap-3">
          <Award className="h-8 w-8 text-gov-yellow shrink-0" />
          <div>
            <h3 className="text-base font-bold">{t("about.recognition")}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t("about.recognitionSub")}</p>
            <p className="text-sm mt-2">{t("about.recognitionDesc")}</p>
          </div>
        </div>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("about.architecture")}</h3>
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead><tr><th>{t("about.component")}</th><th>{t("about.details")}</th></tr></thead>
            <tbody>
              <tr><td>Primary Model</td><td>ConvNeXt Tiny (Fine-tuned)</td></tr>
              <tr><td>Secondary Model</td><td>EfficientNet B4</td></tr>
              <tr><td>Ensemble Method</td><td>Weighted Average (0.6 / 0.4)</td></tr>
              <tr><td>Explainability</td><td>Grad-CAM Heatmaps</td></tr>
              <tr><td>Input Size</td><td>224 × 224 pixels</td></tr>
              <tr><td>Framework</td><td>PyTorch + FastAPI</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("about.dataset")}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Training Images:</span><span className="font-semibold">54,305</span></div>
            <div className="flex justify-between"><span>Validation Images:</span><span className="font-semibold">13,576</span></div>
            <div className="flex justify-between"><span>Disease Classes:</span><span className="font-semibold">38</span></div>
            <div className="flex justify-between"><span>Crop Types:</span><span className="font-semibold">14</span></div>
            <div className="flex justify-between"><span>Source:</span><span className="font-semibold">PlantVillage + Custom</span></div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Training Epochs:</span><span className="font-semibold">50</span></div>
            <div className="flex justify-between"><span>Learning Rate:</span><span className="font-semibold">1e-4 (cosine decay)</span></div>
            <div className="flex justify-between"><span>Optimizer:</span><span className="font-semibold">AdamW</span></div>
            <div className="flex justify-between"><span>Augmentation:</span><span className="font-semibold">RandAugment + Mixup</span></div>
            <div className="flex justify-between"><span>Hardware:</span><span className="font-semibold">NVIDIA T4 GPU</span></div>
          </div>
        </div>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("about.accuracy")}</h3>
        <div className="space-y-3">
          {[
            { label: "Overall Accuracy", value: 96.2 },
            { label: "Top-2 Accuracy", value: 98.7 },
            { label: "Precision (Macro)", value: 95.8 },
            { label: "Recall (Macro)", value: 94.5 },
            { label: "F1-Score (Macro)", value: 95.1 },
          ].map((metric, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span>{metric.label}</span>
                <span className="font-semibold">{metric.value}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${metric.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gov-card">
        <h3 className="text-sm font-semibold mb-3">{t("about.futureScope")}</h3>
        <ul className="space-y-2 text-sm">
          {["about.future1", "about.future2", "about.future3", "about.future4", "about.future5"].map((key) => (
            <li key={key} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="gov-alert-card !border-l-4 border-l-gov-orange bg-accent/30">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-gov-orange shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold">{t("about.disclaimer")}</h4>
            <p className="text-sm text-muted-foreground mt-1">{t("about.disclaimerText")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModelProof;
