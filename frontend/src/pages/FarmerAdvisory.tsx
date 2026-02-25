import { useState } from "react";
import { MessageCircle, Send, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const sampleResponses: Record<string, Record<string, string>> = {
  "advisory.faq1": {
    en: "Early Blight appears as dark brown circular spots with concentric rings on older leaves. Leaves may turn yellow and drop. The disease spreads from lower leaves upward. Monitor regularly and apply Mancozeb 2g/L as a preventive spray.",
    hi: "अगेती झुलसा पुरानी पत्तियों पर संकेंद्रित वलयों के साथ गहरे भूरे गोलाकार धब्बों के रूप में दिखाई देता है। पत्तियाँ पीली होकर गिर सकती हैं। रोग निचली पत्तियों से ऊपर की ओर फैलता है। नियमित निगरानी करें और निवारक छिड़काव के रूप में मैन्कोजेब 2g/L लगाएं।",
  },
  "advisory.faq2": {
    en: "Leaf Curl is caused by whitefly-transmitted virus. Remove infected plants immediately. Spray Imidacloprid 0.3ml/L to control whitefly population. Use resistant varieties if available.",
    hi: "पत्ती मोड़ रोग सफेद मक्खी द्वारा प्रसारित वायरस के कारण होता है। संक्रमित पौधों को तुरंत हटाएं। सफेद मक्खी नियंत्रण के लिए इमिडाक्लोप्रिड 0.3ml/L छिड़कें। उपलब्ध हो तो प्रतिरोधी किस्मों का उपयोग करें।",
  },
  "advisory.faq3": {
    en: "Ensure proper plant spacing for air circulation. Avoid overhead irrigation. Apply Copper Oxychloride 3g/L preventively during humid weather. Practice crop rotation and remove crop debris.",
    hi: "हवा के संचालन के लिए उचित पौधों का अंतर सुनिश्चित करें। ऊपरी सिंचाई से बचें। नम मौसम में निवारक रूप से कॉपर ऑक्सीक्लोराइड 3g/L लगाएं। फसल चक्र अपनाएं और फसल अवशेष हटाएं।",
  },
  "advisory.faq4": {
    en: "For tomato, apply DAP 50kg/acre at planting. Use NPK 19:19:19 at 5g/L as foliar spray every 15 days. During fruiting, apply Potash (MOP) at 25kg/acre. Conduct soil test for precise recommendations.",
    hi: "टमाटर के लिए, बुवाई के समय DAP 50kg/एकड़ लगाएं। हर 15 दिन में NPK 19:19:19 को 5g/L पर पर्णीय छिड़काव के रूप में उपयोग करें। फल लगने के दौरान, पोटाश (MOP) 25kg/एकड़ लगाएं। सटीक सिफारिशों के लिए मिट्टी परीक्षण करें।",
  },
};

const FarmerAdvisory = () => {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "" }, // placeholder, rendered via t()
  ]);
  const [input, setInput] = useState("");

  const faqKeys = ["advisory.faq1", "advisory.faq2", "advisory.faq3", "advisory.faq4"];

  const sendMessage = (text: string, faqKey?: string) => {
    if (!text.trim()) return;
    const userMsg = { role: "user" as const, text };
    let response: string;
    if (faqKey && sampleResponses[faqKey]) {
      response = sampleResponses[faqKey][lang] || sampleResponses[faqKey]["en"];
    } else {
      response = t("advisory.defaultResponse");
    }
    setMessages((prev) => [...prev.filter((m, i) => !(i === 0 && m.text === "")), userMsg, { role: "ai", text: response }]);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="gov-section-title flex items-center gap-2">
          <MessageCircle className="h-5 w-5" /> {t("advisory.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("advisory.subtitle")}</p>
      </div>

      <div className="gov-card !p-0 overflow-hidden">
        <div className="bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground border-b border-border">
          {t("advisory.chat")}
        </div>
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {/* Welcome message */}
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-md px-3 py-2 text-sm bg-muted text-foreground">
              {t("advisory.welcome")}
            </div>
          </div>
          {messages.filter((m) => m.text !== "").map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-md px-3 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder={t("advisory.placeholder")}
            className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button className="gov-btn-primary flex items-center gap-1" onClick={() => sendMessage(input)}>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2">{t("advisory.suggested")}</p>
        <div className="flex flex-wrap gap-2">
          {faqKeys.map((key) => (
            <button key={key} onClick={() => sendMessage(t(key), key)} className="gov-btn-outline !py-1 !px-3 text-xs">
              {t(key)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerAdvisory;
