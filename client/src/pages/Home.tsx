import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Bot, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  Zap, 
  ArrowRight,
  Mail,
  MapPin,
  ChevronRight,
  Award,
  Rocket,
  ChevronDown,
  ArrowUp,
  Search,
  Lightbulb,
  Code2,
  BarChart3,
  Star,
  Phone,
  ExternalLink,
  CheckCircle2,
  Globe
} from "lucide-react";
import { SiLinkedin, SiX, SiInstagram, SiGithub } from "react-icons/si";

import { Navbar } from "@/components/layout/Navbar";
import { PremiumButton } from "@/components/ui/premium-button";
import { Input } from "@/components/ui/premium-input";
import { Textarea } from "@/components/ui/premium-textarea";
import { useSubmitContact } from "@/hooks/use-contact";
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

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return { count, ref };
}

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
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-[0_0_20px_rgba(191,149,63,0.4)] hover:bg-primary hover:shadow-[0_0_30px_rgba(191,149,63,0.6)] transition-all duration-300 hover:-translate-y-1"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/media/hero_video.mp4" type="video/mp4" />
      </video>

      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <Sparkles size={14} />
            <span>The New Era of Digital Excellence</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Building <span className="text-gradient-gold">Intelligent</span>{" "}
            <br className="hidden md:block"/>
            Digital Solutions
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            We architect cutting-edge AI-driven digital ecosystems that redefine how brands operate, innovate, and scale in the modern economy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <PremiumButton size="lg" onClick={() => scrollTo("#services")} className="w-full sm:w-auto" data-testid="button-explore-services">
              Explore Services
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </PremiumButton>
            <PremiumButton size="lg" variant="outline" onClick={() => scrollTo("#contact")} className="w-full sm:w-auto" data-testid="button-contact-hero">
              Start a Project
            </PremiumButton>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("#stats")}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { target: 150, suffix: "+", label: "Projects Delivered", icon: "🚀" },
    { target: 99, suffix: ".9%", label: "System Uptime", icon: "⚡" },
    { target: 5, suffix: "x", label: "Average ROI Growth", icon: "📈" },
    { target: 100, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
  ];

  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-primary/3 to-background" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const { count, ref } = useCountUp(stat.target);
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                    <span ref={ref}>{count}</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img src="/media/tech-abstract-bg.png" alt="Background" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-widest">
                  About Denarixx
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Engineering the <span className="text-gradient-cyan">Unimaginable</span>.
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We are architects of tomorrow's digital future. By merging artificial intelligence with human-centric design philosophy, we create transformative digital ecosystems that don't just exist—they evolve, perform, and dominate their markets.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our approach dismantles complexity, obsessing over precision at every level. From the pixel to the algorithm, we engineer solutions that command respect and deliver measurable impact.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <Rocket className="text-cyan-400" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Innovation First</h4>
                    <p className="text-sm text-muted-foreground">AI-driven strategies that keep you years ahead of competition.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Award className="text-amber-400" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Precision Excellence</h4>
                    <p className="text-sm text-muted-foreground">Flawless execution across design, engineering, and strategy.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl transition-all duration-500 group-hover:blur-3xl" />
              <img 
                src="/media/tech-abstract-bg.png" 
                alt="Innovation" 
                className="relative rounded-3xl border border-border/50 object-cover w-full shadow-2xl filter grayscale-[50%] contrast-[1.2] group-hover:grayscale-[30%] transition-all duration-500"
              />
              <div className="absolute -bottom-8 -right-8 p-8 bg-card border border-border rounded-2xl shadow-2xl hidden md:block backdrop-blur-sm">
                <p className="text-5xl font-bold text-gradient-gold mb-2">10x</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Performance Uplift</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    { 
      icon: Bot, 
      title: "AI Integration", 
      desc: "Embed intelligent models into your digital infrastructure to automate complex workflows, generate insights, and unlock new revenue streams.",
      color: "from-cyan-500/10 to-blue-500/5",
      accent: true,
      tags: ["Machine Learning", "NLP", "Automation"]
    },
    { 
      icon: Layers, 
      title: "Premium Web Design", 
      desc: "Award-winning, conversion-optimized interfaces crafted with obsessive attention to typography, interaction design, and visual hierarchy.",
      color: "from-amber-500/10 to-orange-500/5",
      accent: false,
      tags: ["UI/UX", "Motion", "Responsive"]
    },
    { 
      icon: Cpu, 
      title: "System Automation", 
      desc: "Transform disparate tools and processes into seamless, intelligent systems that reduce friction and multiply operational efficiency.",
      color: "from-cyan-500/10 to-teal-500/5",
      accent: true,
      tags: ["Workflow", "APIs", "Integration"]
    },
    { 
      icon: Sparkles, 
      title: "Brand Identity", 
      desc: "Establish market dominance through cohesive, luxury-tier identity systems that command respect and resonate with premium audiences.",
      color: "from-amber-500/10 to-yellow-500/5",
      accent: false,
      tags: ["Logo", "Visual System", "Strategy"]
    },
    { 
      icon: TrendingUp, 
      title: "Digital Strategy", 
      desc: "Data-driven roadmaps engineered to scale operations, maximize ROI, and position your brand as an industry innovator.",
      color: "from-cyan-500/10 to-blue-500/5",
      accent: true,
      tags: ["Growth", "Analytics", "ROI"]
    },
    {
      icon: Globe,
      title: "Digital Ecosystem",
      desc: "Full-spectrum digital infrastructure from cloud architecture to multi-platform presence — engineered for dominance at scale.",
      color: "from-amber-500/10 to-orange-500/5",
      accent: false,
      tags: ["Cloud", "Scalability", "Multi-platform"]
    }
  ];

  return (
    <section id="services" className="py-32 md:py-40 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img src="/media/innovation-bg.png" alt="Background" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-xs font-semibold mb-4 uppercase tracking-widest">
              Core Capabilities
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Services that <span className="text-gradient-gold">Drive Growth</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive digital solutions engineered for ambitious brands that refuse to compete on price.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                data-testid={`card-service-${i}`}
                className={`group h-full p-8 rounded-2xl bg-card border border-border/50 ${service.accent ? "hover-glow-cyan" : "hover-glow"} flex flex-col transition-all duration-300 hover:-translate-y-2 relative overflow-hidden cursor-pointer`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`p-3 rounded-xl mb-6 w-fit transition-colors ${service.accent ? "bg-cyan-500/10 group-hover:bg-cyan-500/20" : "bg-amber-500/10 group-hover:bg-amber-500/20"}`}>
                    <service.icon size={28} className={service.accent ? "text-cyan-400" : "text-amber-400"} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow text-sm">{service.desc}</p>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium ${service.accent ? "border-cyan-500/20 bg-cyan-500/5 text-cyan-400/70" : "border-amber-500/20 bg-amber-500/5 text-amber-400/70"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className={`mt-6 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 ${service.accent ? "text-cyan-400" : "text-amber-400"}`}>
                    Learn more <ChevronRight size={16} className="ml-1" />
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
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Discovery & Analysis",
      desc: "We deep-dive into your business, goals, and competitive landscape to uncover transformative opportunities others miss.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Strategy & Design",
      desc: "Our team architects a precision-crafted roadmap and visual identity designed for maximum impact and market dominance.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      number: "03",
      icon: Code2,
      title: "Build & Integrate",
      desc: "We engineer your solution with AI-native architecture, cutting-edge technology, and relentless attention to performance.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      number: "04",
      icon: BarChart3,
      title: "Launch & Optimize",
      desc: "We deploy, monitor, and continuously optimize to ensure your digital ecosystem scales with your ambitions.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
  ];

  return (
    <section id="process" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-4 uppercase tracking-widest">
              Our Process
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              How We <span className="text-gradient-cyan">Work</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A battle-tested methodology that transforms vision into measurable digital excellence.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-cyan-500/20 via-amber-500/20 to-cyan-500/20" />
          
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div data-testid={`card-process-${i}`} className="relative flex flex-col items-start group">
                <div className={`relative z-10 w-24 h-24 rounded-2xl ${step.bg} border ${step.border} flex flex-col items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon size={32} className={step.color} />
                  <span className={`text-xs font-bold ${step.color} mt-1 opacity-60`}>{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function InnovationSection() {
  return (
    <section id="innovation" className="py-32 md:py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50 group">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10 group-hover:via-background/70 transition-all duration-500" />
            <img 
              src="/media/ai-network-bg.png" 
              alt="Vision Background" 
              className="absolute inset-0 w-full h-full object-cover object-right opacity-30 filter grayscale-[30%] group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-500"
            />
            
            <div className="relative z-20 p-12 md:p-20 lg:p-28 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs uppercase tracking-widest font-semibold">Our Vision</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Pioneering <span className="text-gradient-gold">Digital Sovereignty</span>.
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 font-light leading-relaxed">
                We believe the future belongs to organizations that seamlessly merge uncompromising design with profound technical intelligence. Our mission: elevate ambitious brands into industry-defining digital powerhouses.
              </p>
              
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary flex-shrink-0 group-hover:border-primary/60 transition-colors">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">Relentless Pursuit of Perfection</p>
                  <p className="text-xs text-muted-foreground">In every design decision, every line of code, every strategic choice.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Denarixx transformed our entire digital presence. The AI integration they built reduced our operational overhead by 60% within three months. Absolutely world-class.",
      name: "Marcus J. Reynolds",
      title: "CEO & Founder",
      company: "Apex Ventures",
      initials: "MR",
      rating: 5,
      accent: true
    },
    {
      quote: "The level of design craftsmanship is unmatched. Our new platform has generated a 3x increase in qualified leads, and every stakeholder who sees it is blown away.",
      name: "Priya Nair",
      title: "Chief Marketing Officer",
      company: "Novara Group",
      initials: "PN",
      rating: 5,
      accent: false
    },
    {
      quote: "Working with Denarixx feels like working with the future. They don't just build software — they build competitive advantages. Our ROI has been extraordinary.",
      name: "Elias Voss",
      title: "VP of Technology",
      company: "Stratify Corp",
      initials: "EV",
      rating: 5,
      accent: true
    },
  ];

  return (
    <section id="testimonials" className="py-32 md:py-40 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img src="/media/ai-network-bg.png" alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">
              Client Stories
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Trusted by <span className="text-gradient-gold">Industry Leaders</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Real results from the brands that bet on excellence.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div
                data-testid={`card-testimonial-${i}`}
                className={`h-full p-8 rounded-2xl bg-card border border-border/50 flex flex-col group hover:-translate-y-2 transition-all duration-300 ${t.accent ? "hover-glow-cyan" : "hover-glow"}`}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                
                <blockquote className="text-foreground/80 leading-relaxed italic flex-grow mb-8 text-sm md:text-base">
                  "{t.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${t.accent ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" : "bg-amber-500/15 text-amber-400 border border-amber-500/30"}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.title} · {t.company}</p>
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

function WhyUsSection() {
  const highlights = [
    { icon: CheckCircle2, text: "Luxury-tier design language & brand positioning", color: "text-amber-400" },
    { icon: CheckCircle2, text: "AI-native architecture & intelligent automation", color: "text-cyan-400" },
    { icon: CheckCircle2, text: "Performance-optimized at every level", color: "text-amber-400" },
    { icon: CheckCircle2, text: "Dedicated partnership & ongoing support model", color: "text-cyan-400" },
    { icon: CheckCircle2, text: "Transparent process with weekly deliverables", color: "text-amber-400" },
    { icon: CheckCircle2, text: "Proven track record across 6+ industries", color: "text-cyan-400" },
  ];

  const differentiators = [
    { value: "99.9%", label: "System Uptime", desc: "Enterprise-grade reliability" },
    { value: "< 0.5s", label: "Load Times", desc: "Lightning-fast performance" },
    { value: "5x", label: "Avg ROI Increase", desc: "Measurable business impact" },
    { value: "24/7", label: "Support Access", desc: "Always-on partnership" },
  ];

  return (
    <section id="why-us" className="py-32 md:py-40 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">
                  Why Choose Denarixx
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  The <span className="text-gradient-gold">Competitive Advantage</span>
                </h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                We don't build commodities. We engineer bespoke digital ecosystems built for market dominance. Choosing Denarixx means betting on relentless excellence.
              </p>
              
              <div className="space-y-4">
                {highlights.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <item.icon size={20} className={`${item.color} flex-shrink-0`} />
                    <p className="text-foreground font-medium">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 gap-6">
            {differentiators.map((d, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  data-testid={`card-differentiator-${i}`}
                  className="p-8 rounded-2xl border border-border/50 bg-card text-center hover-glow transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <p className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">{d.value}</p>
                    <p className="text-sm text-primary uppercase tracking-wider font-semibold mb-1">{d.label}</p>
                    <p className="text-xs text-muted-foreground">{d.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABannerSection() {
  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

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
            <span>Ready to Elevate Your Brand?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Next Chapter Starts <span className="text-gradient-gold">Today</span>.
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the elite brands that chose to dominate their industries. Let's build something extraordinary together.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <PremiumButton size="lg" onClick={() => scrollTo("#contact")} data-testid="button-cta-banner">
              Start Your Project
              <ArrowRight size={18} className="ml-2" />
            </PremiumButton>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <div className="flex -space-x-2">
                {["MR", "PN", "EV"].map((initials, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary">
                    {initials}
                  </div>
                ))}
              </div>
              <span>Joined by 150+ satisfied clients</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ContactSection() {
  const { mutate: submitContact, isPending } = useSubmitContact();
  
  type FormValues = z.infer<typeof insertContactSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = (data: FormValues) => {
    submitContact(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <section id="contact" className="py-32 md:py-40 bg-secondary/30 border-t border-border/50 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <FadeIn>
            <div className="space-y-10">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">
                  Get In Touch
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Let's Create <span className="text-gradient-gold">Together</span>.
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ready to transform your digital presence? Let's discuss how our AI-driven solutions and premium design can elevate your brand.
              </p>

              <div data-testid="text-response-time" className="p-6 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-wide">Response Time</p>
                <p className="text-2xl font-bold text-foreground">Within 24 Hours</p>
                <p className="text-sm text-muted-foreground mt-1">We review every inquiry personally</p>
              </div>
              
              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card border border-border rounded-lg flex-shrink-0">
                    <Mail className="text-primary" size={22} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">hello@denarixx.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card border border-border rounded-lg flex-shrink-0">
                    <Phone className="text-primary" size={22} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Schedule a Call</h4>
                    <p className="text-muted-foreground text-sm">Book a discovery call at your convenience</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card border border-border rounded-lg flex-shrink-0">
                    <MapPin className="text-primary" size={22} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Location</h4>
                    <p className="text-muted-foreground text-sm">Silicon Valley, California<br/>Global Remote Operations</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-8 md:p-10 rounded-3xl bg-card border border-border/50 shadow-2xl space-y-6 hover-glow transition-all duration-300"
              data-testid="form-contact"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">Start Your Project</h3>
                <p className="text-sm text-muted-foreground">Fill in the details below and we'll be in touch shortly.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground uppercase tracking-wide">Full Name</label>
                <Input 
                  placeholder="John Doe" 
                  data-testid="input-name"
                  {...form.register("name")}
                  className={`text-base ${form.formState.errors.name ? "border-destructive/50 focus-visible:border-destructive" : ""}`}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground uppercase tracking-wide">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  data-testid="input-email"
                  {...form.register("email")}
                  className={`text-base ${form.formState.errors.email ? "border-destructive/50 focus-visible:border-destructive" : ""}`}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground uppercase tracking-wide">Project Brief</label>
                <Textarea 
                  placeholder="Tell us about your vision, goals, and timeline..." 
                  data-testid="input-message"
                  {...form.register("message")}
                  className={`text-base min-h-[140px] ${form.formState.errors.message ? "border-destructive/50 focus-visible:border-destructive" : ""}`}
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <PremiumButton type="submit" className="w-full" disabled={isPending} data-testid="button-submit-contact">
                {isPending ? (
                  <><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />Sending...</>
                ) : (
                  <> Send Message <ArrowRight size={16} className="ml-2" /> </>
                )}
              </PremiumButton>

              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to our Privacy Policy. We never share your data.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Innovation", href: "#innovation" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    "AI Integration",
    "Premium Web Design",
    "System Automation",
    "Brand Identity",
    "Digital Strategy",
    "Digital Ecosystem",
  ];

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 pb-16 border-b border-border/30">
          <div className="lg:col-span-1">
            <img
              src={logoUrl}
              alt="Denarixx Logo"
              className="h-9 mb-6 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={scrollToTop}
            />
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Engineering the future through AI, innovation, and relentless digital excellence.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: SiLinkedin, href: "#", label: "LinkedIn" },
                { Icon: SiX, href: "#", label: "X (Twitter)" },
                { Icon: SiInstagram, href: "#", label: "Instagram" },
                { Icon: SiGithub, href: "#", label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-testid={`link-social-${label.toLowerCase().replace(/[^a-z]/g, "")}`}
                  className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-200" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 mb-8">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Based in</p>
              <p className="text-sm font-bold text-foreground">Silicon Valley, CA</p>
              <p className="text-xs text-muted-foreground">Global Remote Operations</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Denarixx AI & Digital Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs text-muted-foreground">
              Crafted with precision · Powered by innovation
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
            >
              Back to top
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
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <InnovationSection />
        <TestimonialsSection />
        <WhyUsSection />
        <CTABannerSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
