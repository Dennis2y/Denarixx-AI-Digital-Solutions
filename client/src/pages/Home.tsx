import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Bot, Cpu, Sparkles, TrendingUp, Layers, Zap, ArrowRight, Mail,
  ChevronRight, ChevronDown, ArrowUp, Search, Lightbulb, Code2,
  BarChart3, Globe, Palette, Rocket, Shield, Target, Building2,
  Smartphone, BrainCircuit, Workflow, Server, PenTool, Eye, Mic,
  Boxes, FlaskConical, Crown, User, MonitorSmartphone, MapPin, Send,
  Download,
  MessageCircle, Phone
} from "lucide-react";
import { Linkedin, Instagram, Github } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Chatbot } from "@/components/ui/chatbot";
import { PremiumButton } from "@/components/ui/premium-button";
import { Input } from "@/components/ui/premium-input";
import { Textarea } from "@/components/ui/premium-textarea";
import { useSubmitContact } from "@/hooks/use-contact";
import { useLanguage } from "@/hooks/use-language";
import { insertContactSchema } from "@shared/schema";
import logoUrl from "@assets/Denarixx_1772975867904.png";
import founderPhotoUrl from "@assets/dennis2_1772985309786.png";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.3 }}
      data-testid="button-scroll-to-top"
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-[0_0_20px_rgba(191,149,63,0.4)] hover:bg-primary hover:shadow-[0_0_30px_rgba(191,149,63,0.6)] transition-all duration-300 hover:-translate-y-1"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}

function scrollTo(href: string) {
  const element = document.querySelector(href);
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { t } = useLanguage();

  return (
    <section ref={ref} className="relative min-h-screen w-full max-w-full flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
        <source src="/media/hero_video.mp4" type="video/mp4" />
      </video>

      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/15 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 md:w-[500px] md:h-[500px] bg-primary/8 rounded-full blur-[90px] md:blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[700px] md:h-[700px] bg-cyan-500/5 rounded-full blur-[100px] md:blur-[180px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-5xl">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <Sparkles size={14} />
            <span>{t("hero.eyebrow")}</span>
          </motion.div>
          
          <h1 className="overflow-hidden mb-8 w-full" data-testid="hero-marquee">
            <span className="sr-only">Denarixx Digital Solutions — AI, Software, Automation and Digital Solutions</span>
            <div className="hero-marquee-track text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] whitespace-nowrap">
              <span className="inline-block px-6 md:px-10">
                <span className="text-gradient-cyan">{t("hero.headline1")}</span>{" "}
                <span className="text-gradient-gold">{t("hero.headline2")}</span>{" "}
                <span className="text-gradient-purple">{t("hero.headline3")}</span>
              </span>
              <span className="inline-block px-6 md:px-10 opacity-30" aria-hidden="true">
                <span className="text-gradient-cyan">{t("hero.headline1")}</span>{" "}
                <span className="text-gradient-gold">{t("hero.headline2")}</span>{" "}
                <span className="text-gradient-purple">{t("hero.headline3")}</span>
              </span>
              <span className="inline-block px-6 md:px-10">
                <span className="text-gradient-cyan">{t("hero.headline1")}</span>{" "}
                <span className="text-gradient-gold">{t("hero.headline2")}</span>{" "}
                <span className="text-gradient-purple">{t("hero.headline3")}</span>
              </span>
              <span className="inline-block px-6 md:px-10 opacity-30" aria-hidden="true">
                <span className="text-gradient-cyan">{t("hero.headline1")}</span>{" "}
                <span className="text-gradient-gold">{t("hero.headline2")}</span>{" "}
                <span className="text-gradient-purple">{t("hero.headline3")}</span>
              </span>
            </div>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed px-2 text-center">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <PremiumButton size="lg" onClick={() => scrollTo("#services")} className="w-full sm:w-auto" data-testid="button-explore-services">
              {t("hero.cta1")}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </PremiumButton>
            <PremiumButton size="lg" variant="outline" onClick={() => scrollTo("#contact")} className="w-full sm:w-auto" data-testid="button-contact-hero">
              {t("hero.cta2")}
            </PremiumButton>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/90 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium flex-wrap px-4 text-center" data-testid="text-hero-trust-line">
            <span>{t("hero.trust.ai")}</span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span>{t("hero.trust.automation")}</span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span>{t("hero.trust.platforms")}</span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span>{t("hero.trust.web")}</span>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}

function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-16 sm:py-20 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img src="/media/tech-abstract-bg.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <FadeIn>
            <div className="space-y-8 min-w-0">
              <div className="min-w-0">
                <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-widest">
                  {t("about.badge")}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">
                  {t("about.heading1")} <span className="text-gradient-cyan">{t("about.heading2")}</span> {t("about.heading3")}
                </h2>
              </div>
              <div className="space-y-4 sm:space-y-5">
                <p className="text-[15px] sm:text-lg md:text-xl text-gray-100 leading-7 sm:leading-relaxed font-medium">{t("about.p1")}</p>
                <p className="text-[15px] sm:text-lg md:text-xl text-gray-100 leading-7 sm:leading-relaxed font-medium">{t("about.p2")}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <BrainCircuit className="text-cyan-400" size={24} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-white mb-1">{t("about.aifirst")}</h4>
                    <p className="text-sm sm:text-base text-gray-100 leading-7 sm:leading-relaxed font-medium">{t("about.aifirst.desc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                      <Palette className="text-amber-400" size={24} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-white mb-1">{t("about.premium")}</h4>
                    <p className="text-sm sm:text-base text-gray-100 leading-7 sm:leading-relaxed font-medium">{t("about.premium.desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl transition-all duration-500 group-hover:blur-3xl" />
              <img src="/media/tech-abstract-bg.png" alt="Abstract technology visualization" className="relative rounded-3xl border border-border/50 object-cover w-full shadow-2xl filter grayscale-[50%] contrast-[1.2] group-hover:grayscale-[30%] transition-all duration-500" />
              <div className="absolute -bottom-6 -right-6 p-6 bg-card border border-border/60 rounded-2xl shadow-2xl hidden md:block backdrop-blur-sm">
                <p className="text-sm text-white/90 uppercase tracking-wider font-semibold">{t("about.builtfor")}</p>
                <p className="text-xl sm:text-2xl font-bold text-gradient-gold mt-1">{t("about.thefuture")}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t } = useLanguage();
  const services = [
    { icon: Bot, titleKey: "services.ai", descKey: "services.ai.desc", color: "from-cyan-500/10 to-blue-500/5", accent: true, tagKeys: ["services.tag.ml", "services.tag.nlp", "services.tag.predictive"] },
    { icon: Layers, titleKey: "services.web", descKey: "services.web.desc", color: "from-amber-500/10 to-orange-500/5", accent: false, tagKeys: ["services.tag.uiux", "services.tag.fullstack", "services.tag.responsive"] },
    { icon: Cpu, titleKey: "services.automation", descKey: "services.automation.desc", color: "from-cyan-500/10 to-teal-500/5", accent: true, tagKeys: ["services.tag.workflow", "services.tag.apis", "services.tag.integration"] },
    { icon: PenTool, titleKey: "services.branding", descKey: "services.branding.desc", color: "from-amber-500/10 to-yellow-500/5", accent: false, tagKeys: ["services.tag.brandid", "services.tag.visualdesign", "services.tag.strategy"] },
    { icon: TrendingUp, titleKey: "services.strategy", descKey: "services.strategy.desc", color: "from-cyan-500/10 to-blue-500/5", accent: true, tagKeys: ["services.tag.growth", "services.tag.analytics", "services.tag.roadmapping"] },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 md:py-36 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img src="/media/innovation-bg.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-xs font-semibold mb-4 uppercase tracking-widest">{t("services.badge")}</div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">
              {t("services.heading1")} <span className="text-gradient-gold">{t("services.heading2")}</span>
            </h2>
            <p className="text-base sm:text-lg text-white/90">{t("services.subtitle")}</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div data-testid={`card-service-${i}`} className={`group h-full p-8 rounded-2xl bg-card border border-border/50 ${service.accent ? "hover-glow-cyan" : "hover-glow"} flex flex-col transition-all duration-300 hover:-translate-y-2 relative overflow-hidden min-w-0`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
                <div className="relative z-10 flex flex-col h-full min-w-0">
                  <div className={`p-3 rounded-xl mb-6 w-fit transition-colors ${service.accent ? "bg-cyan-500/10 group-hover:bg-cyan-500/20" : "bg-amber-500/10 group-hover:bg-amber-500/20"}`}>
                    <service.icon size={28} className={service.accent ? "text-cyan-400" : "text-amber-400"} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white break-words">{t(service.titleKey)}</h3>
                  <p className="text-white/90 leading-relaxed flex-grow text-sm">{t(service.descKey)}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tagKeys.map((tagKey) => (
                      <span key={tagKey} className={`text-xs px-2.5 py-1 rounded-full border font-medium ${service.accent ? "border-cyan-500/20 bg-cyan-500/5 text-cyan-400/70" : "border-amber-500/20 bg-amber-500/5 text-amber-400/70"}`}>{t(tagKey)}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { t } = useLanguage();
  const steps = [
    { number: "01", icon: Search, titleKey: "process.discover", descKey: "process.discover.desc", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { number: "02", icon: Lightbulb, titleKey: "process.design", descKey: "process.design.desc", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { number: "03", icon: Code2, titleKey: "process.build", descKey: "process.build.desc", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { number: "04", icon: Rocket, titleKey: "process.launch", descKey: "process.launch.desc", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { number: "05", icon: BarChart3, titleKey: "process.scale", descKey: "process.scale.desc", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  ];

  return (
    <section id="process" className="py-16 sm:py-20 md:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-widest">{t("process.badge")}</div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">{t("process.heading1")} <span className="text-gradient-cyan">{t("process.heading2")}</span></h2>
            <p className="text-base sm:text-lg text-white/90">{t("process.subtitle")}</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-cyan-500/20 via-amber-500/20 to-cyan-500/20" />
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div data-testid={`card-process-${i}`} className="relative flex flex-col items-start group">
                <div className={`relative z-10 w-20 h-20 rounded-2xl ${step.bg} border ${step.border} flex flex-col items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon size={28} className={step.color} />
                  <span className={`text-xs font-bold ${step.color} mt-1 opacity-60`}>{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 break-words">{t(step.titleKey)}</h3>
                <p className="text-sm text-white/90 leading-relaxed break-words">{t(step.descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  const { t } = useLanguage();
  const cards = [
    { icon: BrainCircuit, titleKey: "vision.card.ai", descKey: "vision.card.ai.desc", accent: true },
    { icon: Globe, titleKey: "vision.card.platforms", descKey: "vision.card.platforms.desc", accent: false },
    { icon: Workflow, titleKey: "vision.card.automation", descKey: "vision.card.automation.desc", accent: true },
    { icon: Smartphone, titleKey: "vision.card.products", descKey: "vision.card.products.desc", accent: false },
    { icon: Server, titleKey: "vision.card.infra", descKey: "vision.card.infra.desc", accent: true },
  ];

  return (
    <section id="vision" className="py-16 sm:py-20 md:py-36 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50 group mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10 group-hover:via-background/70 transition-all duration-500" />
            <img src="/media/ai-network-bg.png" alt="Technology network visualization" className="absolute inset-0 w-full h-full object-cover object-right opacity-45 filter grayscale-[30%] group-hover:grayscale-0 group-hover:opacity-55 transition-all duration-500" />
            <div className="relative z-20 p-12 md:p-20 lg:p-24 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs uppercase tracking-widest font-semibold">{t("nav.vision")}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">{t("vision.heading1")} <span className="text-gradient-gold">{t("vision.heading2")}</span></h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 font-light leading-relaxed">
                {t("vision.paragraph")}
              </p>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary flex-shrink-0 group-hover:border-primary/60 transition-colors">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">{t("vision.innovation")}</p>
                  <p className="text-xs text-white/90">{t("vision.innovation.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div data-testid={`card-vision-${i}`} className={`p-6 rounded-2xl bg-card border border-border/50 group hover:-translate-y-2 transition-all duration-300 h-full ${card.accent ? "hover-glow-cyan" : "hover-glow"}`}>
                <div className={`p-3 rounded-xl mb-4 w-fit ${card.accent ? "bg-cyan-500/10" : "bg-amber-500/10"}`}>
                  <card.icon size={24} className={card.accent ? "text-cyan-400" : "text-amber-400"} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{t(card.titleKey)}</h3>
                <p className="text-sm text-white/90 leading-relaxed break-words">{t(card.descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { t } = useLanguage();
  const projects = [
    { icon: BrainCircuit, titleKey: "projects.ai", descKey: "projects.ai.desc", accent: true },
    { icon: Building2, titleKey: "projects.websites", descKey: "projects.websites.desc", accent: false },
    { icon: Smartphone, titleKey: "projects.product", descKey: "projects.product.desc", accent: true },
    { icon: Workflow, titleKey: "projects.automation", descKey: "projects.automation.desc", accent: false },
    { icon: Rocket, titleKey: "projects.startup", descKey: "projects.startup.desc", accent: true },
    { icon: Globe, titleKey: "projects.platforms", descKey: "projects.platforms.desc", accent: false },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-36 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("projects.badge")}</div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">{t("projects.heading1")} <span className="text-gradient-gold">{t("projects.heading2")}</span></h2>
            <p className="text-base sm:text-lg text-white/90">{t("projects.subtitle")}</p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://denarixx.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#D4AF37] bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                {t("projects.personalWebsite")}
              </a>
              <a
                href="https://www.denarixxoneearth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t("projects.oneEarth")}
              </a>
            </div>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div data-testid={`card-project-${i}`} className={`group h-full p-5 sm:p-8 rounded-2xl bg-card border border-border/50 ${project.accent ? "hover-glow-cyan" : "hover-glow"} flex flex-col transition-all duration-300 hover:-translate-y-2 relative overflow-hidden`}>
                <div className="relative z-10 flex flex-col h-full min-w-0">
                  <div className={`p-3 rounded-xl mb-6 w-fit ${project.accent ? "bg-cyan-500/10" : "bg-amber-500/10"}`}>
                    <project.icon size={28} className={project.accent ? "text-cyan-400" : "text-amber-400"} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-white leading-tight break-words [overflow-wrap:anywhere] [hyphens:auto]">{t(project.titleKey)}</h3>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed break-words [overflow-wrap:anywhere] flex-grow">{t(project.descKey)}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectedWorkSection() {
  const { t } = useLanguage();
  const work = [
    { titleKey: "selectedwork.ai", catKey: "selectedwork.ai.cat", descKey: "selectedwork.ai.desc", icon: BrainCircuit, accent: true },
    { titleKey: "selectedwork.web", catKey: "selectedwork.web.cat", descKey: "selectedwork.web.desc", icon: Building2, accent: false },
    { titleKey: "selectedwork.startup", catKey: "selectedwork.startup.cat", descKey: "selectedwork.startup.desc", icon: Rocket, accent: true },
    { titleKey: "selectedwork.automation", catKey: "selectedwork.automation.cat", descKey: "selectedwork.automation.desc", icon: Workflow, accent: false },
  ];

  return (
    <section id="selected-work" className="py-16 sm:py-20 md:py-36 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("selectedwork.badge")}</div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">{t("selectedwork.heading1")} <span className="text-gradient-gold">{t("selectedwork.heading2")}</span></h2>
            <p className="text-base sm:text-lg text-white/90">{t("selectedwork.subtitle")}</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {work.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div data-testid={`card-selected-work-${i}`} className={`group p-6 sm:p-10 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${item.accent ? "hover-glow-cyan" : "hover-glow"}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent ? "from-cyan-500/5 to-transparent" : "from-primary/5 to-transparent"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${item.accent ? "border-cyan-500/20 bg-cyan-500/5 text-cyan-400/80" : "border-amber-500/20 bg-amber-500/5 text-amber-400/80"}`}>{t(item.catKey)}</span>
                    <div className={`p-2.5 rounded-xl ${item.accent ? "bg-cyan-500/10" : "bg-amber-500/10"}`}>
                      <item.icon size={22} className={item.accent ? "text-cyan-400" : "text-amber-400"} />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 leading-tight break-words [overflow-wrap:anywhere] [hyphens:auto]">{t(item.titleKey)}</h3>
                  <p className="text-white/90 leading-relaxed">{t(item.descKey)}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  const { t } = useLanguage();
  return (
    <section id="behind" className="py-16 sm:py-20 md:py-36 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("founder.badge")}</div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">{t("founder.heading1")} <span className="text-gradient-gold">{t("founder.heading2")}</span></h2>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <FadeIn>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-cyan-500/10 rounded-3xl blur-2xl transition-all duration-500 group-hover:blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
                <img
                  src={founderPhotoUrl}
                  alt="Dennis Charles — Founder & CEO"
                  className="w-full object-cover aspect-[3/4] filter group-hover:scale-[1.02] transition-transform duration-700"
                  data-testid="img-founder"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-00 left-0 right-0 p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white break-words" data-testid="text-founder-name">Dennis Charles</h3>
                  <p className="text-primary font-semibold text-sm mt-1" data-testid="text-founder-title">{t("founder.role")}</p>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-8 min-w-0">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-[2px] bg-primary" />
                  <span className="text-primary text-xs uppercase tracking-widest font-semibold">{t("founder.badge")}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2" data-testid="text-founder-heading">Dennis Charles</h3>
                <p className="text-primary font-semibold mb-6">{t("founder.role")} — Denarixx Digital Solutions</p>
              </div>
              <div className="space-y-4 sm:space-y-5">
                <p className="text-lg text-white/90 leading-relaxed break-words">{t("founder.bio1")}</p>
                <p className="text-lg text-white/90 leading-relaxed break-words">{t("founder.bio2")}</p>
                <p className="text-lg text-white/90 leading-relaxed break-words">{t("founder.bio3")}</p>
              </div>
              <FadeIn delay={0.3}>
                <div className="relative mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/15">
                  <div className="absolute -top-3 left-6 text-4xl text-primary/30 font-serif">"</div>
                  <p className="text-base text-white/90 italic leading-relaxed pl-4" data-testid="text-founder-quote">{t("founder.quote")}</p>
                  <p className="text-xs text-primary/60 mt-3 pl-4 font-semibold uppercase tracking-wider">— Dennis Charles</p>
                </div>
              </FadeIn>
              <div className="flex flex-wrap gap-3 pt-4">
                {["founder.tag1", "founder.tag2", "founder.tag3", "founder.tag4"].map((tagKey, i) => (
                  <span key={tagKey} data-testid={`tag-founder-${i}`} className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary/80 font-medium">{t(tagKey)}</span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  "founder.pillar1",
                  "founder.pillar2",
                  "founder.pillar3",
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-white/90">
                    {t(item)}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function InnovationLabSection() {
  const { t } = useLanguage();
  const products = [
    { icon: Eye, title: "Denarixx Vision", labelKey: "innovation.vision.label", descKey: "innovation.vision.desc", accent: true },
    { icon: Mic, title: "Denarixx REMEMO", labelKey: "innovation.rememo.label", descKey: "innovation.rememo.desc", accent: false },
    { icon: Workflow, title: "AI Automation Platforms", labelKey: "innovation.autoplatform.label", descKey: "innovation.autoplatform.desc", accent: true },
    { icon: MonitorSmartphone, title: "Future Smart Devices", labelKey: "innovation.smartdevices.label", descKey: "innovation.smartdevices.desc", accent: false },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="innovation-lab" className="py-16 sm:py-20 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/media/innovation_lab_bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-background/50 z-[1]" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-widest">
              <FlaskConical size={12} />
              {t("innovation.badge")}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">{t("innovation.heading1")} <span className="text-gradient-cyan">{t("innovation.heading2")}</span></h2>
            <p className="text-base sm:text-lg text-white/90">{t("innovation.subtitle")}</p>
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <p className="text-base text-white/90/80 leading-relaxed text-center max-w-4xl mx-auto mb-16 break-words px-1 sm:px-0" data-testid="text-innovation-intro">{t("innovation.intro")}</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div data-testid={`card-innovation-${i}`} className={`group p-8 sm:p-10 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden h-full min-w-0 ${product.accent ? "hover-glow-cyan" : "hover-glow"}`}>
                <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${product.accent ? "bg-cyan-500/10" : "bg-primary/10"}`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl w-fit ${product.accent ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-amber-500/10 border border-amber-500/20"}`}>
                      <product.icon size={28} className={product.accent ? "text-cyan-400" : "text-amber-400"} />
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider border ${product.accent ? "text-cyan-400/70 border-cyan-500/20 bg-cyan-500/5" : "text-amber-400/70 border-amber-500/20 bg-amber-500/5"}`}>
                      {t(product.labelKey)}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{product.title}</h3>
                  <p className="text-white/90 leading-relaxed">{t(product.descKey)}</p>
                  <div className={`mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider ${product.accent ? "text-cyan-400/60" : "text-amber-400/60"}`}>
                    {t("innovation.status")}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={0.4} className="md:col-span-2">
            <div data-testid="card-innovation-4" className="group p-8 sm:p-10 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden h-full hover-glow min-w-0">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 bg-primary/10" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl w-fit bg-primary/10 border border-primary/20">
                    <Lightbulb size={28} className="text-primary" />
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider border text-primary/70 border-primary/20 bg-primary/5">
                    {t("innovation.more.label")}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{t("innovation.more.title")}</h3>
                <p className="text-white/90 leading-relaxed">{t("innovation.more.desc")}</p>
                <div className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-primary/60">
                  {t("innovation.status")}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.5}>
          <p className="text-xs text-white/90/50 text-center mt-10 max-w-3xl mx-auto leading-relaxed italic" data-testid="text-innovation-disclaimer">{t("innovation.disclaimer")}</p>
        </FadeIn>
        <FadeIn delay={0.6}>
          <div className="flex justify-center mt-10">
            <button
              onClick={scrollToContact}
              data-testid="button-discuss-concept"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              {t("innovation.cta")}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function WhoWeWorkWithSection() {
  const { t } = useLanguage();
  const audiences = [
    { icon: Rocket, titleKey: "clients.startups", descKey: "clients.startups.desc", accent: true },
    { icon: Building2, titleKey: "clients.smb", descKey: "clients.smb.desc", accent: false },
    { icon: Crown, titleKey: "clients.premium", descKey: "clients.premium.desc", accent: true },
    { icon: User, titleKey: "clients.founders", descKey: "clients.founders.desc", accent: false },
    { icon: MonitorSmartphone, titleKey: "clients.digital", descKey: "clients.digital.desc", accent: true },
  ];

  return (
    <section id="who-we-work-with" className="py-16 sm:py-20 md:py-36 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("clients.badge")}</div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">{t("clients.heading1")} <span className="text-gradient-gold">{t("clients.heading2")}</span></h2>
            <p className="text-base sm:text-lg text-white/90">{t("clients.subtitle")}</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {audiences.map((aud, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div data-testid={`card-audience-${i}`} className={`group h-full p-8 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:-translate-y-2 ${aud.accent ? "hover-glow-cyan" : "hover-glow"} min-w-0`}>
                <div className={`p-3 rounded-xl mb-6 w-fit ${aud.accent ? "bg-cyan-500/10" : "bg-amber-500/10"}`}>
                  <aud.icon size={26} className={aud.accent ? "text-cyan-400" : "text-amber-400"} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 break-words">{t(aud.titleKey)}</h3>
                <p className="text-sm text-white/90 leading-relaxed break-words">{t(aud.descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const { t } = useLanguage();
  const highlights = [
    { icon: BrainCircuit, textKey: "whyus.h1", color: "text-cyan-400" },
    { icon: Palette, textKey: "whyus.h2", color: "text-amber-400" },
    { icon: Server, textKey: "whyus.h3", color: "text-cyan-400" },
    { icon: Target, textKey: "whyus.h4", color: "text-amber-400" },
    { icon: Code2, textKey: "whyus.h5", color: "text-cyan-400" },
    { icon: Shield, textKey: "whyus.h6", color: "text-amber-400" },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 md:py-36 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <FadeIn>
            <div className="space-y-8 min-w-0">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("whyus.badge")}</div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">{t("whyus.heading1")} <span className="text-gradient-gold">{t("whyus.heading2")}</span></h2>
              </div>
              <p className="text-lg text-white/90 leading-relaxed break-words">{t("whyus.desc")}</p>
              <div className="space-y-4">
                {highlights.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }} className="flex items-start gap-4 min-w-0">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${item.color === "text-cyan-400" ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-amber-500/10 border border-amber-500/20"}`}>
                      <item.icon size={20} className={`${item.color} flex-shrink-0`} />
                    </div>
                    <p className="text-white font-medium break-words">{t(item.textKey)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/15 to-cyan-500/10 rounded-3xl blur-2xl transition-all duration-500 group-hover:blur-3xl" />
              <div className="relative p-8 sm:p-10 rounded-3xl bg-card border border-border/50 space-y-8 min-w-0">
                <div className="space-y-2 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-white break-words">{t("whyus.card.heading")}</h3>
                  <p className="text-sm text-white/90 break-words">{t("whyus.card.subtitle")}</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { labelKey: "whyus.card.t1", descKey: "whyus.card.t1.desc", icon: Target },
                    { labelKey: "whyus.card.t2", descKey: "whyus.card.t2.desc", icon: Code2 },
                    { labelKey: "whyus.card.t3", descKey: "whyus.card.t3.desc", icon: Shield },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start min-w-0">
                      <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{t(item.labelKey)}</p>
                        <p className="text-xs text-white/90 mt-0.5">{t(item.descKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function WhatIsSection() {
  const { t } = useLanguage();

  const points = [
    "whatis.point1",
    "whatis.point2",
    "whatis.point3",
    "whatis.point4",
  ];

  return (
    <section id="what-is" className="py-14 sm:py-18 md:py-32 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn>
            <div className="space-y-6 min-w-0">
              <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest">
                {t("whatis.badge")}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] break-words">
                {t("whatis.heading1")} <span className="text-gradient-gold">{t("whatis.heading2")}</span>
              </h2>
              <p className="text-lg text-white/90 leading-relaxed break-words">{t("whatis.p1")}</p>
              <p className="text-lg text-white/90 leading-relaxed break-words">{t("whatis.p2")}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-3xl border border-border/50 bg-card p-8 sm:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {points.map((point, i) => (
                  <div key={i} className="rounded-2xl border border-primary/15 bg-primary/5 p-5 text-white font-medium">
                    {t(point)}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const { t } = useLanguage();
  const cases = [
    {
      titleKey: "usecases.card1.title",
      descKey: "usecases.card1.desc",
    },
    {
      titleKey: "usecases.card2.title",
      descKey: "usecases.card2.desc",
    },
    {
      titleKey: "usecases.card3.title",
      descKey: "usecases.card3.desc",
    },
    {
      titleKey: "usecases.card4.title",
      descKey: "usecases.card4.desc",
    },
  ];

  return (
    <section id="use-cases" className="py-14 sm:py-18 md:py-32 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-widest">
              {t("usecases.badge")}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">
              {t("usecases.heading")}
            </h2>
            <p className="text-base sm:text-lg text-white/90">
              {t("usecases.subtitle")}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {cases.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group h-full p-8 rounded-2xl bg-card border border-border/50 hover:-translate-y-1 transition-all duration-300 min-w-0">
                <h3 className="text-xl font-bold mb-3 text-white break-words">{t(item.titleKey)}</h3>
                <p className="text-white/90 leading-relaxed break-words">{t(item.descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  const { t } = useLanguage();

  const posts = [
    {
      titleKey: "blog.card1.title",
      descKey: "blog.card1.desc",
      tagKey: "blog.card1.tag",
    },
    {
      titleKey: "blog.card2.title",
      descKey: "blog.card2.desc",
      tagKey: "blog.card2.tag",
    },
    {
      titleKey: "blog.card3.title",
      descKey: "blog.card3.desc",
      tagKey: "blog.card3.tag",
    },
  ];

  return (
    <section id="blog" className="py-14 sm:py-18 md:py-32 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">
              {t("blog.badge")}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">
              {t("blog.heading1")} <span className="text-gradient-gold">{t("blog.heading2")}</span>
            </h2>
            <p className="text-base sm:text-lg text-white/90">
              {t("blog.subtitle")}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="h-full p-8 rounded-2xl bg-card border border-border/50 min-w-0">
                <div className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                  {t(post.tagKey)}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white break-words">{t(post.titleKey)}</h3>
                <p className="text-white/90 leading-relaxed break-words">{t(post.descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}



function ProductsSystemsSection() {
  const items = [
    {
      title: "Denarixx Fraud Alert",
      desc: "An intelligent fraud detection and risk-alert system designed to help businesses and institutions identify suspicious activity faster.",
    },
    {
      title: "Denarixx Child Safety",
      desc: "A smart safety concept focused on child monitoring, alerts, and protection tools for modern families and institutions.",
    },
    {
      title: "Denarixx REMEMO",
      desc: "An AI memory system concept designed to capture important conversations and organize information intelligently.",
    },
    {
      title: "Denarixx Aura & Terra",
      desc: "Future mobility and intelligent product concepts representing Denarixx’s broader innovation vision beyond digital services.",
    },
    {
      title: "Denarixx Energy MicroGrid AI",
      desc: "A long-term intelligent energy management vision focused on smart infrastructure, decentralized systems, and scalable impact.",
    },
    {
      title: "Denarixx Automation Platforms",
      desc: "Workflow systems that connect operations, reduce manual effort, and help businesses scale with more efficiency.",
    },
  ];

  return (
    <section id="products-systems" className="py-14 sm:py-18 md:py-32 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">
              Products & Systems
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">
              What We’re <span className="text-gradient-gold">Building</span>
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Denarixx is not only a digital solutions company. It is also building future-focused systems, products, and intelligent technology concepts.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group h-full p-8 rounded-2xl bg-card border border-border/50 hover:-translate-y-1 transition-all duration-300 min-w-0">
                <h3 className="text-xl font-bold mb-3 text-white break-words">{item.title}</h3>
                <p className="text-white/90 leading-relaxed break-words">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}


function CTABannerSection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-cyan-500/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/50" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-00 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
            <Sparkles size={14} />
            <span>{t("cta.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">{t("cta.heading1")} <span className="text-gradient-gold">{t("cta.heading2")}</span></h2>
          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">{t("cta.subtitle")}</p>
          <PremiumButton size="lg" onClick={() => scrollTo("#contact")} data-testid="button-cta-banner">
            {t("cta.button")}
            <ArrowRight size={18} className="ml-2" />
          </PremiumButton>
        </FadeIn>
      </div>
    </section>
  );
}

function ContactSection() {
  const { mutate: submitContact, isPending } = useSubmitContact();
  const { t } = useLanguage();

  const contactFormSchema = insertContactSchema.extend({
    company: z.string().optional(),
    projectType: z.string().optional(),
    budget: z.string().optional(),
  });

  type FormValues = z.infer<typeof contactFormSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "", company: "", projectType: "", budget: "" }
  });

  const onSubmit = (data: FormValues) => {
    let fullMessage = data.message;
    const extras: string[] = [];
    if (data.company) extras.push(`Company: ${data.company}`);
    if (data.projectType) extras.push(`Project Type: ${data.projectType}`);
    if (data.budget) extras.push(`Budget Range: ${data.budget}`);
    if (extras.length > 0) fullMessage = `${extras.join(" | ")}\n\n${fullMessage}`;

    submitContact(
      { name: data.name, email: data.email, message: fullMessage },
      { onSuccess: () => form.reset() }
    );
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-36 bg-secondary/30 border-t border-border/50 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <FadeIn>
            <div className="space-y-8 min-w-0">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("contact.badge")}</div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] break-words">{t("contact.heading1")} <span className="text-gradient-gold">{t("contact.heading2")}</span></h2>
              </div>
              <p className="text-lg text-white/90 leading-relaxed break-words">{t("contact.subtitle")}</p>
              <div data-testid="text-response-time" className="p-6 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-wide">{t("contact.response")}</p>
                <p className="text-xl sm:text-2xl font-bold text-white break-words">{t("contact.24h")}</p>
                <p className="text-sm text-white/90 mt-1">{t("contact.review")}</p>
              </div>
              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card border border-border rounded-xl flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1 text-sm">Email</h4>
                    <a
                      href="mailto:info@denarixx.com"
                      className="text-white/90 text-sm hover:text-primary transition-colors"
                    >
                      info@denarixx.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card border border-border rounded-xl flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1 text-sm">Phone</h4>
                    <a
                      href="tel:+4917660467839"
                      className="text-white/90 text-sm hover:text-primary transition-colors"
                    >
                      +49 176 60467839
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card border border-border rounded-xl flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1 text-sm">{t("contact.location")}</h4>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Soltauer Straße 66A<br />
                      21244 Buchholz in der Nordheide<br />
                      Germany
                    </p>
                    <p className="text-white/70 text-xs mt-1">{t("contact.location.value")}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-border/50 bg-card">
                <img src={logoUrl} alt="Denarixx Digital Solutions" className="h-8 mb-4 opacity-80" />
                <p className="text-sm text-white/90 leading-relaxed break-words">{t("contact.companydesc")}</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-10 rounded-3xl bg-card border border-border/50 shadow-2xl space-y-5 hover-glow transition-all duration-300" data-testid="form-contact">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{t("contact.form.title")}</h3>
                <p className="text-sm text-white/90 break-words">{t("contact.form.subtitle")}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2 min-w-0">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-white uppercase tracking-wide">{t("contact.form.name")} *</label>
                  <Input id="contact-name" placeholder={t("contact.form.name")} data-testid="input-name" {...form.register("name")} className={`text-sm ${form.formState.errors.name ? "border-destructive/50" : ""}`} />
                  {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2 min-w-0">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-white uppercase tracking-wide">{t("contact.form.email")} *</label>
                  <Input id="contact-email" type="email" placeholder="you@company.com" data-testid="input-email" {...form.register("email")} className={`text-sm ${form.formState.errors.email ? "border-destructive/50" : ""}`} />
                  {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2 min-w-0">
                <label htmlFor="contact-company" className="text-xs font-semibold text-white uppercase tracking-wide">{t("contact.form.company")}</label>
                <Input id="contact-company" placeholder={t("contact.form.company")} data-testid="input-company" {...form.register("company")} className="text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2 min-w-0">
                  <label htmlFor="contact-project-type" className="text-xs font-semibold text-white uppercase tracking-wide">{t("contact.form.projecttype")}</label>
                  <select id="contact-project-type" data-testid="select-project-type" {...form.register("projectType")} className="w-full h-11 px-4 text-sm rounded-lg bg-background border border-border text-white focus:outline-none focus:border-primary/50 transition-colors">
                    <option value="">{t("contact.form.selecttype")}</option>
                    <option value="AI System">{t("contact.form.aisystem")}</option>
                    <option value="Website">{t("contact.form.website")}</option>
                    <option value="Automation">{t("contact.form.automationopt")}</option>
                    <option value="Branding">{t("contact.form.brandingopt")}</option>
                    <option value="Consulting">{t("contact.form.consultingopt")}</option>
                    <option value="Other">{t("contact.form.otheropt")}</option>
                  </select>
                </div>
                <div className="space-y-2 min-w-0">
                  <label htmlFor="contact-budget" className="text-xs font-semibold text-white uppercase tracking-wide">{t("contact.form.budget")}</label>
                  <select id="contact-budget" data-testid="select-budget" {...form.register("budget")} className="w-full h-11 px-4 text-sm rounded-lg bg-background border border-border text-white focus:outline-none focus:border-primary/50 transition-colors">
                    <option value="">{t("contact.form.selectrange")}</option>
                    <option value="Under €5,000">{t("contact.form.under5k")}</option>
                    <option value="€5,000 – €15,000">{t("contact.form.5to15k")}</option>
                    <option value="€15,000 – €50,000">{t("contact.form.15to50k")}</option>
                    <option value="€50,000+">{t("contact.form.50kplus")}</option>
                    <option value="Not sure yet">{t("contact.form.notsure")}</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 min-w-0">
                <label htmlFor="contact-message" className="text-xs font-semibold text-white uppercase tracking-wide">{t("contact.form.brief")} *</label>
                <Textarea id="contact-message" placeholder={t("contact.form.brief")} data-testid="input-message" {...form.register("message")} className={`text-sm min-h-[120px] ${form.formState.errors.message ? "border-destructive/50" : ""}`} />
                {form.formState.errors.message && <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>}
              </div>
              <PremiumButton type="submit" className="w-full" disabled={isPending} data-testid="button-submit-contact">
                {isPending ? (
                  <><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />{t("contact.form.sending")}</>
                ) : (
                  <>{t("contact.form.submit")} <ArrowRight size={16} className="ml-2" /></>
                )}
              </PremiumButton>
              <p className="text-xs text-white/90 text-center">{t("contact.form.privacy")}</p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-cyan-500/5" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container mx-auto px-4 max-w-2xl relative z-10 text-center">
        <FadeIn>
          <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-6 uppercase tracking-widest">{t("newsletter.badge")}</div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">{t("newsletter.heading")}</h3>
          <p className="text-white/90 mb-8 text-sm leading-relaxed">{t("newsletter.text")}</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" data-testid="form-newsletter">
            <Input type="email" placeholder="your@email.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required data-testid="input-newsletter-email" className="text-sm flex-1" />
            <PremiumButton type="submit" size="default" data-testid="button-newsletter-subscribe">
              <Send size={14} className="mr-2" />
              {t("newsletter.subscribe")}
            </PremiumButton>
          </form>
          {submitted && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-primary mt-4 font-medium" data-testid="text-newsletter-success">
              {t("newsletter.thanks")}
            </motion.p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

function FooterInstallButton() {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    const ua = window.navigator.userAgent;
    const iosDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    setIsIos(iosDevice);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (isIos) {
      setShowIosHint(!showIosHint);
      return;
    }
    if (!deferredPrompt) {
      setShowIosHint(!showIosHint);
      return;
    }
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) return null;

  return (
    <div className="space-y-2 min-w-0">
      <button
        onClick={handleInstall}
        className="group flex items-center gap-2.5 px-4 py-2.5 w-full rounded-xl bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/30 hover:border-primary/60 hover:from-primary/25 hover:to-primary/10 transition-all duration-300"
        data-testid="button-footer-install"
      >
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
          <Download size={15} className="text-primary" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-white leading-tight">{t("pwa.install")}</p>
          <p className="text-[11px] text-white/90 leading-tight mt-0.5">{t("pwa.install.desc")}</p>
        </div>
      </button>
      {showIosHint && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-xs text-primary/80 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2 leading-relaxed"
          data-testid="text-ios-hint"
        >
          {t("pwa.ios.hint")}
        </motion.p>
      )}
    </div>
  );
}

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const { t } = useLanguage();

  const navLinks = [
    { labelKey: "nav.about", href: "#about" },
    { labelKey: "nav.services", href: "#services" },
    { labelKey: "nav.vision", href: "#vision" },
    { labelKey: "nav.projects", href: "#projects" },
    { labelKey: "footer.innovationlab", href: "#innovation-lab" },
    { labelKey: "nav.contact", href: "#contact" },
  ];

  const services = [
    "services.ai", "services.web", "services.automation", "services.branding", "services.strategy",
  ];

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 pb-16 border-b border-border/30">
          <div className="lg:col-span-1">
            <img src={logoUrl} alt="Denarixx Digital Solutions" className="h-9 mb-6 opacity-90 hover:opacity-100 transition-opacity cursor-pointer" onClick={scrollToTop} />
            <p className="text-sm text-white/90 leading-relaxed mb-6">{t("footer.desc")}</p>
            <p className="text-xs text-primary/70 font-medium mb-6">{t("footer.innovation")}</p>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: MessageCircle, href: "#", label: "X (Twitter)" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Github, href: "#", label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} data-testid={`link-social-${label.toLowerCase().replace(/[^a-z]/g, "")}`} className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-white/90 hover:text-primary hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest">{t("footer.nav")}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.labelKey}>
                  <button onClick={() => scrollTo(link.href)} className="text-sm text-white/90 hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-200" />
                    {t(link.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {services.map((key) => (
                <li key={key}>
                  <button onClick={() => scrollTo("#services")} className="text-sm text-white/90 hover:text-primary transition-colors flex items-center gap-1.5 group text-left">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-200 flex-shrink-0" />
                    {t(key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest">{t("footer.legal")}</h4>
            <ul className="space-y-3 mb-8">
              <li><a href="/privacy" data-testid="link-privacy-policy" className="text-sm text-white/90 hover:text-primary transition-colors">{t("footer.privacy")}</a></li>
              <li><a href="/terms" data-testid="link-terms" className="text-sm text-white/90 hover:text-primary transition-colors">{t("footer.terms")}</a></li>
              <li><a href="/impressum" data-testid="link-impressum" className="text-sm text-white/90 hover:text-primary transition-colors">{t("footer.impressum")}</a></li>
              <li><a href="/cookies" data-testid="link-cookie-policy" className="text-sm text-white/90 hover:text-primary transition-colors">{t("footer.cookies")}</a></li>
            </ul>
            <FooterInstallButton />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/90">&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
          <div className="flex items-center gap-6">
            <button onClick={scrollToTop} className="flex items-center gap-2 text-xs text-white/90 hover:text-primary transition-colors group" data-testid="button-back-to-top">
              {t("footer.backtotop")}
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WhatIsSection />
        <ServicesSection />
        <ProcessSection />
        <UseCasesSection />
        <VisionSection />
        <ProjectsSection />
        <SelectedWorkSection />
        <InnovationLabSection />
        <FounderSection />
        <WhoWeWorkWithSection />
        <WhyUsSection />
        <BlogSection />
        <CTABannerSection />
        <ContactSection />
      </main>
      <NewsletterSection />
      <Footer />
      <Chatbot />
    </div>
  );
}
