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
  Boxes, FlaskConical, Crown, User, MonitorSmartphone, MapPin, Send
} from "lucide-react";
import { SiLinkedin, SiX, SiInstagram, SiGithub } from "react-icons/si";

import { Navbar } from "@/components/layout/Navbar";
import { PremiumButton } from "@/components/ui/premium-button";
import { Input } from "@/components/ui/premium-input";
import { Textarea } from "@/components/ui/premium-textarea";
import { useSubmitContact } from "@/hooks/use-contact";
import { useLanguage } from "@/hooks/use-language";
import { insertContactSchema } from "@shared/schema";
import logoUrl from "@assets/Denarixx_1772975867904.png";

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
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-25">
        <source src="/media/hero_video.mp4" type="video/mp4" />
      </video>

      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-5xl">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <Sparkles size={14} />
            <span>{t("hero.eyebrow")}</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            {t("hero.headline1")} <span className="text-gradient-gold">{t("hero.headline2")}</span>{" "}
            <br className="hidden md:block"/>
            {t("hero.headline3")}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light leading-relaxed">
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

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="flex items-center justify-center gap-3 text-xs text-muted-foreground/60 uppercase tracking-[0.2em] font-medium flex-wrap" data-testid="text-hero-trust-line">
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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer" onClick={() => scrollTo("#about")}>
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{t("hero.scroll")}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={20} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img src="/media/tech-abstract-bg.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-widest">
                  {t("about.badge")}
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {t("about.heading1")} <span className="text-gradient-cyan">{t("about.heading2")}</span> {t("about.heading3")}
                </h2>
              </div>
              <div className="space-y-5">
                <p className="text-lg text-muted-foreground leading-relaxed">{t("about.p1")}</p>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("about.p2")}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <BrainCircuit className="text-cyan-400" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground mb-1">{t("about.aifirst")}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t("about.aifirst.desc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                      <Palette className="text-amber-400" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground mb-1">{t("about.premium")}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t("about.premium.desc")}</p>
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
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{t("about.builtfor")}</p>
                <p className="text-2xl font-bold text-gradient-gold mt-1">{t("about.thefuture")}</p>
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
    <section id="services" className="py-28 md:py-36 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img src="/media/innovation-bg.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-xs font-semibold mb-4 uppercase tracking-widest">{t("services.badge")}</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("services.heading1")} <span className="text-gradient-gold">{t("services.heading2")}</span>
            </h2>
            <p className="text-lg text-muted-foreground">{t("services.subtitle")}</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div data-testid={`card-service-${i}`} className={`group h-full p-8 rounded-2xl bg-card border border-border/50 ${service.accent ? "hover-glow-cyan" : "hover-glow"} flex flex-col transition-all duration-300 hover:-translate-y-2 relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`p-3 rounded-xl mb-6 w-fit transition-colors ${service.accent ? "bg-cyan-500/10 group-hover:bg-cyan-500/20" : "bg-amber-500/10 group-hover:bg-amber-500/20"}`}>
                    <service.icon size={28} className={service.accent ? "text-cyan-400" : "text-amber-400"} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{t(service.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow text-sm">{t(service.descKey)}</p>
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
    <section id="process" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-widest">{t("process.badge")}</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("process.heading1")} <span className="text-gradient-cyan">{t("process.heading2")}</span></h2>
            <p className="text-lg text-muted-foreground">{t("process.subtitle")}</p>
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
                <h3 className="text-lg font-bold text-foreground mb-3">{t(step.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
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
    <section id="vision" className="py-28 md:py-36 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50 group mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10 group-hover:via-background/70 transition-all duration-500" />
            <img src="/media/ai-network-bg.png" alt="Technology network visualization" className="absolute inset-0 w-full h-full object-cover object-right opacity-30 filter grayscale-[30%] group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-500" />
            <div className="relative z-20 p-12 md:p-20 lg:p-24 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs uppercase tracking-widest font-semibold">{t("nav.vision")}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">{t("vision.heading1")} <span className="text-gradient-gold">{t("vision.heading2")}</span></h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 font-light leading-relaxed">
                {t("vision.paragraph")}
              </p>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary flex-shrink-0 group-hover:border-primary/60 transition-colors">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">{t("vision.innovation")}</p>
                  <p className="text-xs text-muted-foreground">{t("vision.innovation.desc")}</p>
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
                <h3 className="text-base font-bold text-foreground mb-2">{t(card.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(card.descKey)}</p>
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
    <section id="projects" className="py-28 md:py-36 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("projects.badge")}</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("projects.heading1")} <span className="text-gradient-gold">{t("projects.heading2")}</span></h2>
            <p className="text-lg text-muted-foreground">{t("projects.subtitle")}</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div data-testid={`card-project-${i}`} className={`group h-full p-8 rounded-2xl bg-card border border-border/50 ${project.accent ? "hover-glow-cyan" : "hover-glow"} flex flex-col transition-all duration-300 hover:-translate-y-2 relative overflow-hidden`}>
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`p-3 rounded-xl mb-6 w-fit ${project.accent ? "bg-cyan-500/10" : "bg-amber-500/10"}`}>
                    <project.icon size={28} className={project.accent ? "text-cyan-400" : "text-amber-400"} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{t(project.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{t(project.descKey)}</p>
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
    <section id="selected-work" className="py-28 md:py-36 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("selectedwork.badge")}</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("selectedwork.heading1")} <span className="text-gradient-gold">{t("selectedwork.heading2")}</span></h2>
            <p className="text-lg text-muted-foreground">{t("selectedwork.subtitle")}</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {work.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div data-testid={`card-selected-work-${i}`} className={`group p-10 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${item.accent ? "hover-glow-cyan" : "hover-glow"}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent ? "from-cyan-500/5 to-transparent" : "from-primary/5 to-transparent"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${item.accent ? "border-cyan-500/20 bg-cyan-500/5 text-cyan-400/80" : "border-amber-500/20 bg-amber-500/5 text-amber-400/80"}`}>{t(item.catKey)}</span>
                    <div className={`p-2.5 rounded-xl ${item.accent ? "bg-cyan-500/10" : "bg-amber-500/10"}`}>
                      <item.icon size={22} className={item.accent ? "text-cyan-400" : "text-amber-400"} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
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
    <section id="behind" className="py-28 md:py-36 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("founder.badge")}</div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("founder.heading1")} <span className="text-gradient-gold">{t("founder.heading2")}</span></h2>
              </div>
              <div className="space-y-5">
                <p className="text-lg text-muted-foreground leading-relaxed">{t("founder.p1")}</p>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("founder.p2")}</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/15 to-cyan-500/10 rounded-3xl blur-2xl" />
              <div className="relative p-10 rounded-3xl bg-card border border-border/50 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <User size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{t("founder.led")}</h3>
                    <p className="text-sm text-muted-foreground">{t("founder.led.desc")}</p>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-border/50" />
                <div className="flex flex-wrap gap-3">
                  {["founder.tag1", "founder.tag2", "founder.tag3", "founder.tag4"].map((tagKey) => (
                    <span key={tagKey} className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary/80 font-medium">{t(tagKey)}</span>
                  ))}
                </div>
                <div className="space-y-4 pt-2">
                  {[
                    { labelKey: "founder.point1", descKey: "founder.point1.desc" },
                    { labelKey: "founder.point2", descKey: "founder.point2.desc" },
                    { labelKey: "founder.point3", descKey: "founder.point3.desc" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t(item.labelKey)}</p>
                        <p className="text-xs text-muted-foreground">{t(item.descKey)}</p>
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

function InnovationLabSection() {
  const { t } = useLanguage();
  const products = [
    { icon: Eye, title: "Denarixx Vision", descKey: "innovation.vision.desc", accent: true },
    { icon: Mic, title: "Denarixx REMEMO", descKey: "innovation.rememo.desc", accent: false },
    { icon: Boxes, titleKey: "innovation.aisystems", descKey: "innovation.aisystems.desc", accent: true },
    { icon: FlaskConical, titleKey: "innovation.future", descKey: "innovation.future.desc", accent: false },
  ];

  return (
    <section id="innovation-lab" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 opacity-3 z-0">
        <img src="/media/ai-network-bg.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-widest">
              <FlaskConical size={12} />
              {t("innovation.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("innovation.heading1")} <span className="text-gradient-cyan">{t("innovation.heading2")}</span></h2>
            <p className="text-lg text-muted-foreground">{t("innovation.subtitle")}</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div data-testid={`card-innovation-${i}`} className={`group p-10 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden h-full ${product.accent ? "hover-glow-cyan" : "hover-glow"}`}>
                <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${product.accent ? "bg-cyan-500/10" : "bg-primary/10"}`} />
                <div className="relative z-10">
                  <div className={`p-3 rounded-xl mb-6 w-fit ${product.accent ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-amber-500/10 border border-amber-500/20"}`}>
                    <product.icon size={28} className={product.accent ? "text-cyan-400" : "text-amber-400"} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{product.titleKey ? t(product.titleKey) : product.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(product.descKey)}</p>
                  <div className={`mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider ${product.accent ? "text-cyan-400/60" : "text-amber-400/60"}`}>
                    {t("innovation.status")}
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
    <section id="who-we-work-with" className="py-28 md:py-36 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("clients.badge")}</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("clients.heading1")} <span className="text-gradient-gold">{t("clients.heading2")}</span></h2>
            <p className="text-lg text-muted-foreground">{t("clients.subtitle")}</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((aud, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div data-testid={`card-audience-${i}`} className={`group h-full p-8 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:-translate-y-2 ${aud.accent ? "hover-glow-cyan" : "hover-glow"}`}>
                <div className={`p-3 rounded-xl mb-6 w-fit ${aud.accent ? "bg-cyan-500/10" : "bg-amber-500/10"}`}>
                  <aud.icon size={26} className={aud.accent ? "text-cyan-400" : "text-amber-400"} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{t(aud.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(aud.descKey)}</p>
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
    <section id="why-us" className="py-28 md:py-36 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("whyus.badge")}</div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("whyus.heading1")} <span className="text-gradient-gold">{t("whyus.heading2")}</span></h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("whyus.desc")}</p>
              <div className="space-y-4">
                {highlights.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }} className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${item.color === "text-cyan-400" ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-amber-500/10 border border-amber-500/20"}`}>
                      <item.icon size={20} className={`${item.color} flex-shrink-0`} />
                    </div>
                    <p className="text-foreground font-medium">{t(item.textKey)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/15 to-cyan-500/10 rounded-3xl blur-2xl transition-all duration-500 group-hover:blur-3xl" />
              <div className="relative p-10 rounded-3xl bg-card border border-border/50 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{t("whyus.card.heading")}</h3>
                  <p className="text-sm text-muted-foreground">{t("whyus.card.subtitle")}</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { labelKey: "whyus.card.t1", descKey: "whyus.card.t1.desc", icon: Target },
                    { labelKey: "whyus.card.t2", descKey: "whyus.card.t2.desc", icon: Code2 },
                    { labelKey: "whyus.card.t3", descKey: "whyus.card.t3.desc", icon: Shield },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{t(item.labelKey)}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{t(item.descKey)}</p>
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

function CTABannerSection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-cyan-500/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/50" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
            <Sparkles size={14} />
            <span>{t("cta.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("cta.heading1")} <span className="text-gradient-gold">{t("cta.heading2")}</span></h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">{t("cta.subtitle")}</p>
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
    <section id="contact" className="py-28 md:py-36 bg-secondary/30 border-t border-border/50 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">{t("contact.badge")}</div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("contact.heading1")} <span className="text-gradient-gold">{t("contact.heading2")}</span></h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("contact.subtitle")}</p>
              <div data-testid="text-response-time" className="p-6 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-wide">{t("contact.response")}</p>
                <p className="text-2xl font-bold text-foreground">{t("contact.24h")}</p>
                <p className="text-sm text-muted-foreground mt-1">{t("contact.review")}</p>
              </div>
              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card border border-border rounded-xl flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1 text-sm">Email</h4>
                    <p className="text-muted-foreground text-sm">hello@denarixx.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card border border-border rounded-xl flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1 text-sm">{t("contact.location")}</h4>
                    <p className="text-muted-foreground text-sm">{t("contact.location.value")}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-border/50 bg-card">
                <img src={logoUrl} alt="Denarixx AI & Digital Solutions" className="h-8 mb-4 opacity-80" />
                <p className="text-sm text-muted-foreground leading-relaxed">{t("contact.companydesc")}</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-10 rounded-3xl bg-card border border-border/50 shadow-2xl space-y-5 hover-glow transition-all duration-300" data-testid="form-contact">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{t("contact.form.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("contact.form.subtitle")}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-foreground uppercase tracking-wide">{t("contact.form.name")} *</label>
                  <Input id="contact-name" placeholder={t("contact.form.name")} data-testid="input-name" {...form.register("name")} className={`text-sm ${form.formState.errors.name ? "border-destructive/50" : ""}`} />
                  {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-foreground uppercase tracking-wide">{t("contact.form.email")} *</label>
                  <Input id="contact-email" type="email" placeholder="you@company.com" data-testid="input-email" {...form.register("email")} className={`text-sm ${form.formState.errors.email ? "border-destructive/50" : ""}`} />
                  {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-company" className="text-xs font-semibold text-foreground uppercase tracking-wide">{t("contact.form.company")}</label>
                <Input id="contact-company" placeholder={t("contact.form.company")} data-testid="input-company" {...form.register("company")} className="text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="contact-project-type" className="text-xs font-semibold text-foreground uppercase tracking-wide">{t("contact.form.projecttype")}</label>
                  <select id="contact-project-type" data-testid="select-project-type" {...form.register("projectType")} className="w-full h-11 px-4 text-sm rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                    <option value="">{t("contact.form.selecttype")}</option>
                    <option value="AI System">{t("contact.form.aisystem")}</option>
                    <option value="Website">{t("contact.form.website")}</option>
                    <option value="Automation">{t("contact.form.automationopt")}</option>
                    <option value="Branding">{t("contact.form.brandingopt")}</option>
                    <option value="Consulting">{t("contact.form.consultingopt")}</option>
                    <option value="Other">{t("contact.form.otheropt")}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-budget" className="text-xs font-semibold text-foreground uppercase tracking-wide">{t("contact.form.budget")}</label>
                  <select id="contact-budget" data-testid="select-budget" {...form.register("budget")} className="w-full h-11 px-4 text-sm rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                    <option value="">{t("contact.form.selectrange")}</option>
                    <option value="Under €5,000">{t("contact.form.under5k")}</option>
                    <option value="€5,000 – €15,000">{t("contact.form.5to15k")}</option>
                    <option value="€15,000 – €50,000">{t("contact.form.15to50k")}</option>
                    <option value="€50,000+">{t("contact.form.50kplus")}</option>
                    <option value="Not sure yet">{t("contact.form.notsure")}</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs font-semibold text-foreground uppercase tracking-wide">{t("contact.form.brief")} *</label>
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
              <p className="text-xs text-muted-foreground text-center">{t("contact.form.privacy")}</p>
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
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{t("newsletter.heading")}</h3>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{t("newsletter.text")}</p>
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
            <img src={logoUrl} alt="Denarixx AI & Digital Solutions" className="h-9 mb-6 opacity-90 hover:opacity-100 transition-opacity cursor-pointer" onClick={scrollToTop} />
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t("footer.desc")}</p>
            <p className="text-xs text-primary/70 font-medium mb-6">{t("footer.innovation")}</p>
            <div className="flex gap-3">
              {[
                { Icon: SiLinkedin, href: "#", label: "LinkedIn" },
                { Icon: SiX, href: "#", label: "X (Twitter)" },
                { Icon: SiInstagram, href: "#", label: "Instagram" },
                { Icon: SiGithub, href: "#", label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} data-testid={`link-social-${label.toLowerCase().replace(/[^a-z]/g, "")}`} className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">{t("footer.nav")}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.labelKey}>
                  <button onClick={() => scrollTo(link.href)} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-200" />
                    {t(link.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {services.map((key) => (
                <li key={key}>
                  <button onClick={() => scrollTo("#services")} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group text-left">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-200 flex-shrink-0" />
                    {t(key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">{t("footer.legal")}</h4>
            <ul className="space-y-3 mb-8">
              <li><a href="#" data-testid="link-privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer.privacy")}</a></li>
              <li><a href="#" data-testid="link-terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer.terms")}</a></li>
              <li><a href="#" data-testid="link-impressum" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer.impressum")}</a></li>
              <li><a href="#" data-testid="link-cookie-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("footer.cookies")}</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
          <div className="flex items-center gap-6">
            <button onClick={scrollToTop} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group" data-testid="button-back-to-top">
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
        <ServicesSection />
        <ProcessSection />
        <VisionSection />
        <ProjectsSection />
        <SelectedWorkSection />
        <FounderSection />
        <InnovationLabSection />
        <WhoWeWorkWithSection />
        <WhyUsSection />
        <CTABannerSection />
        <ContactSection />
      </main>
      <NewsletterSection />
      <Footer />
    </div>
  );
}
