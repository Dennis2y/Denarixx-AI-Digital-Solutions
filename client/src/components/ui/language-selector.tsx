import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage, LANGUAGES, type Language } from "@/hooks/use-language";

export function LanguageSelector() {
  const { language, setLanguage, currentOption } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" data-testid="language-selector">
      <button
        onClick={() => setOpen(!open)}
        data-testid="button-language-toggle"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-200 text-sm"
        aria-label="Select language"
      >
        <span className="text-base leading-none">{currentOption.flag}</span>
        <span className="hidden sm:inline text-xs text-muted-foreground font-medium">{currentOption.code.toUpperCase()}</span>
        <ChevronDown size={12} className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border/60 bg-card shadow-2xl backdrop-blur-xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-1.5">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code as Language); setOpen(false); }}
                data-testid={`button-lang-${lang.code}`}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors duration-150 ${
                  language === lang.code
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-secondary/60"
                }`}
              >
                <span className="text-lg leading-none">{lang.flag}</span>
                <span className="font-medium">{lang.label}</span>
                {language === lang.code && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
