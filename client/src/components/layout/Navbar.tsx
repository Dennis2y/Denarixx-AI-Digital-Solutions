import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import logoUrl from "@assets/Denarixx_1772975867904.png";

const NAV_KEYS = [
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.vision", href: "#vision" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-border/50 shadow-lg py-3" 
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-cyan-400 to-primary transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
        data-testid="progress-scroll"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="link-logo"
          >
            <img 
              src={logoUrl} 
              alt="Denarixx AI & Digital Solutions" 
              className="h-8 md:h-10 object-contain transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_KEYS.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollTo(link.href)}
                data-testid={`link-nav-${link.key.split(".")[1]}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide relative group"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <LanguageSelector />
            <PremiumButton onClick={() => scrollTo("#contact")} size="sm" data-testid="button-nav-cta">
              {t("nav.cta")}
            </PremiumButton>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              data-testid="button-theme-toggle-mobile"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <LanguageSelector />
            <button 
              className="text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`
        md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50
        transition-all duration-300 ease-in-out overflow-hidden
        ${mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
      `}>
        <div className="flex flex-col px-4 py-6 gap-6">
          {NAV_KEYS.map((link) => (
            <button
              key={link.key}
              onClick={() => scrollTo(link.href)}
              className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {t(link.key)}
            </button>
          ))}
          <PremiumButton onClick={() => scrollTo("#contact")} className="w-full mt-2">
            {t("nav.cta")}
          </PremiumButton>
        </div>
      </div>
    </header>
  );
}
