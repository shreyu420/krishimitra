import { useState, useEffect } from "react";
import { Plus, Minus, Sun, Moon, Eye, Type, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AccessibilityToolbar = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  const increase = () => setFontSize((s) => Math.min(s + 15, 160));
  const decrease = () => setFontSize((s) => Math.max(s - 15, 85));
  const reset = () => { setFontSize(100); setHighContrast(false); };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3 w-56 space-y-3 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" /> {t("a11y.title")}
            </span>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground flex items-center gap-1"><Type className="h-3 w-3" /> {t("a11y.fontSize")}</p>
            <div className="flex items-center gap-2">
              <button onClick={decrease} className="gov-btn-outline !px-2 !py-1 text-xs"><Minus className="h-3 w-3" /></button>
              <span className="text-sm font-semibold text-foreground flex-1 text-center">{fontSize}%</span>
              <button onClick={increase} className="gov-btn-outline !px-2 !py-1 text-xs"><Plus className="h-3 w-3" /></button>
            </div>
          </div>

          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-colors ${
              highContrast
                ? "bg-foreground text-background"
                : "bg-muted text-foreground hover:bg-accent"
            }`}
          >
            {highContrast ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            {t("a11y.highContrast")}
          </button>

          <button onClick={reset} className="w-full text-xs text-muted-foreground hover:text-foreground text-center py-1">
            {t("a11y.reset")}
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="bg-primary text-primary-foreground h-12 w-12 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Accessibility"
      >
        <Eye className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
