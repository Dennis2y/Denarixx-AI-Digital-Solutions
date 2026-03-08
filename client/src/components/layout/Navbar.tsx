import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import logoUrl from "@assets/Denarixx_1772975867904.png";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Innovation", href: "#innovation" },
  { label: "Why Us", href: "#why-us" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img 
              src={logoUrl} 
              alt="Denarixx Logo" 
              className="h-8 md:h-10 object-contain transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <PremiumButton onClick={() => scrollTo("#contact")} size="sm">
              Start Project
            </PremiumButton>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50
        transition-all duration-300 ease-in-out overflow-hidden
        ${mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
      `}>
        <div className="flex flex-col px-4 py-6 gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <PremiumButton onClick={() => scrollTo("#contact")} className="w-full mt-2">
            Start Project
          </PremiumButton>
        </div>
      </div>
    </header>
  );
}
