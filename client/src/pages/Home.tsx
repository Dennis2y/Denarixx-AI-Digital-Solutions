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
  ChevronRight,
  ChevronDown,
  ArrowUp,
  Search,
  Lightbulb,
  Code2,
  BarChart3,
  Globe,
  CheckCircle2,
  Palette,
  Rocket,
  Shield,
  Target,
  Building2,
  Smartphone,
  BrainCircuit,
  Workflow,
  Server,
  PenTool
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
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
      >
        <source src="/media/hero_video.mp4" type="video/mp4" />
      </video>

      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]" />
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
            <span>AI-Powered Digital Excellence</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Building <span className="text-gradient-gold">Intelligent</span>{" "}
            <br className="hidden md:block"/>
            Digital Solutions
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Denarixx AI & Digital Solutions helps businesses, startups, and brands build powerful digital products, AI systems, automation workflows, and premium online experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <PremiumButton size="lg" onClick={() => scrollTo("#services")} className="w-full sm:w-auto" data-testid="button-explore-services">
              Explore Services
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </PremiumButton>
            <PremiumButton size="lg" variant="outline" onClick={() => scrollTo("#contact")} className="w-full sm:w-auto" data-testid="button-contact-hero">
              Contact Us
            </PremiumButton>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("#about")}
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

function AboutSection() {
  return (
    <section id="about" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img src="/media/tech-abstract-bg.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
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
                  Where <span className="text-gradient-cyan">Intelligence</span> Meets Design
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Denarixx AI & Digital Solutions is a technology company focused on building intelligent digital products for modern businesses. We combine artificial intelligence, premium design, and scalable software engineering to help our clients grow, automate, and lead in their industries.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From AI-powered business systems to beautifully crafted websites and digital platforms, we deliver solutions that are both technically robust and visually exceptional. Every project is built with long-term scalability, performance, and real business impact in mind.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <BrainCircuit className="text-cyan-400" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-2">AI-First Approach</h4>
                    <p className="text-sm text-muted-foreground">We integrate artificial intelligence into every solution to deliver smarter, faster results.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Palette className="text-amber-400" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Premium Quality</h4>
                    <p className="text-sm text-muted-foreground">Every detail — from design to deployment — is crafted to the highest standard.</p>
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
                alt="Abstract technology visualization" 
                className="relative rounded-3xl border border-border/50 object-cover w-full shadow-2xl filter grayscale-[50%] contrast-[1.2] group-hover:grayscale-[30%] transition-all duration-500"
              />
              <div className="absolute -bottom-8 -right-8 p-8 bg-card border border-border rounded-2xl shadow-2xl hidden md:block backdrop-blur-sm">
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Built for</p>
                <p className="text-2xl font-bold text-gradient-gold mt-1">The Future</p>
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
      title: "AI Solutions", 
      desc: "Custom AI systems, machine learning models, and intelligent automation that help your business make smarter decisions, streamline operations, and unlock new opportunities.",
      color: "from-cyan-500/10 to-blue-500/5",
      accent: true,
      tags: ["Machine Learning", "NLP", "Predictive Analytics"]
    },
    { 
      icon: Layers, 
      title: "Web Design & Development", 
      desc: "High-performance websites and web applications built with modern frameworks, responsive design, and conversion-focused user experiences that represent your brand at its best.",
      color: "from-amber-500/10 to-orange-500/5",
      accent: false,
      tags: ["UI/UX", "Full-Stack", "Responsive"]
    },
    { 
      icon: Cpu, 
      title: "Automation & Digital Transformation", 
      desc: "Streamline your business operations with intelligent workflows, system integrations, and process automation that reduce manual effort and increase efficiency at scale.",
      color: "from-cyan-500/10 to-teal-500/5",
      accent: true,
      tags: ["Workflow", "APIs", "Integration"]
    },
    { 
      icon: PenTool, 
      title: "Branding & Creative Design", 
      desc: "Comprehensive brand identity systems, visual design, and creative direction that position your company as a premium, trustworthy presence in your market.",
      color: "from-amber-500/10 to-yellow-500/5",
      accent: false,
      tags: ["Brand Identity", "Visual Design", "Strategy"]
    },
    { 
      icon: TrendingUp, 
      title: "Digital Strategy & Product Consulting", 
      desc: "Data-driven strategic planning, product roadmaps, and technology consulting that align your digital investments with real business outcomes and long-term growth.",
      color: "from-cyan-500/10 to-blue-500/5",
      accent: true,
      tags: ["Growth", "Analytics", "Roadmapping"]
    },
  ];

  return (
    <section id="services" className="py-32 md:py-40 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img src="/media/innovation-bg.png" alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-xs font-semibold mb-4 uppercase tracking-widest">
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Solutions that <span className="text-gradient-gold">Drive Growth</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              End-to-end digital services designed for businesses that want to lead, not follow.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                data-testid={`card-service-${i}`}
                className={`group h-full p-8 rounded-2xl bg-card border border-border/50 ${service.accent ? "hover-glow-cyan" : "hover-glow"} flex flex-col transition-all duration-300 hover:-translate-y-2 relative overflow-hidden cursor-default`}
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
      title: "Discover",
      desc: "We learn about your business, goals, audience, and challenges to define the right scope and strategy for your project.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Design",
      desc: "Our team creates wireframes, visual designs, and detailed plans that bring your vision to life before a single line of code is written.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      number: "03",
      icon: Code2,
      title: "Build",
      desc: "We develop your solution using modern, scalable technology — with regular updates, clean code, and a focus on performance.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      number: "04",
      icon: Rocket,
      title: "Launch",
      desc: "After thorough testing and quality assurance, we deploy your product and ensure a smooth, reliable launch.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      number: "05",
      icon: BarChart3,
      title: "Scale",
      desc: "Post-launch, we monitor performance, gather insights, and continuously optimize to help your product grow with your business.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
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
              A structured, transparent process from first conversation to long-term growth.
            </p>
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
                <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  const cards = [
    { icon: BrainCircuit, title: "AI Systems", desc: "Intelligent platforms that learn, adapt, and deliver actionable insights for your business.", accent: true },
    { icon: Globe, title: "Smart Platforms", desc: "Connected digital ecosystems that unify data, users, and processes in one seamless experience.", accent: false },
    { icon: Workflow, title: "Intelligent Automation", desc: "Self-optimizing workflows that reduce manual effort and scale with your operations.", accent: true },
    { icon: Smartphone, title: "Future Products", desc: "Innovative digital products designed to meet tomorrow's market demands today.", accent: false },
    { icon: Server, title: "Scalable Infrastructure", desc: "Cloud-native architecture built for reliability, performance, and growth at any scale.", accent: true },
  ];

  return (
    <section id="vision" className="py-32 md:py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50 group mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10 group-hover:via-background/70 transition-all duration-500" />
            <img 
              src="/media/ai-network-bg.png" 
              alt="Technology network visualization" 
              className="absolute inset-0 w-full h-full object-cover object-right opacity-30 filter grayscale-[30%] group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-500"
            />
            
            <div className="relative z-20 p-12 md:p-20 lg:p-28 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-primary text-xs uppercase tracking-widest font-semibold">Our Vision</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Shaping the <span className="text-gradient-gold">Digital Future</span>
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 font-light leading-relaxed">
                We believe the most successful companies of tomorrow will be those that fully embrace intelligent technology today. Our mission is to equip ambitious businesses with the AI-driven tools, platforms, and strategies they need to lead their industries.
              </p>
              
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary flex-shrink-0 group-hover:border-primary/60 transition-colors">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">Innovation at Every Level</p>
                  <p className="text-xs text-muted-foreground">From strategy and design to engineering and deployment.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                data-testid={`card-vision-${i}`}
                className={`p-6 rounded-2xl bg-card border border-border/50 group hover:-translate-y-2 transition-all duration-300 ${card.accent ? "hover-glow-cyan" : "hover-glow"}`}
              >
                <div className={`p-3 rounded-xl mb-4 w-fit ${card.accent ? "bg-cyan-500/10" : "bg-amber-500/10"}`}>
                  <card.icon size={24} className={card.accent ? "text-cyan-400" : "text-amber-400"} />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = [
    { 
      icon: BrainCircuit, 
      title: "AI Business Systems", 
      desc: "Custom AI models and decision engines for enterprise workflows, customer insights, and operational intelligence.",
      accent: true 
    },
    { 
      icon: Building2, 
      title: "Company Websites", 
      desc: "Premium, high-converting corporate websites that establish credibility and drive business results.",
      accent: false 
    },
    { 
      icon: Smartphone, 
      title: "Digital Product Design", 
      desc: "End-to-end product design for web and mobile apps — from user research and wireframing to polished, pixel-perfect interfaces.",
      accent: true 
    },
    { 
      icon: Workflow, 
      title: "Automation Systems", 
      desc: "Intelligent workflow automation connecting your tools, APIs, and processes into efficient, self-running systems.",
      accent: false 
    },
    { 
      icon: Rocket, 
      title: "Startup Technology Ecosystems", 
      desc: "Full-stack technology foundations for startups — from MVP to scalable production systems, built for speed and growth.",
      accent: true 
    },
    { 
      icon: Globe, 
      title: "Digital Platforms", 
      desc: "Multi-user platforms, marketplaces, and SaaS products engineered for performance, security, and scale.",
      accent: false 
    },
  ];

  return (
    <section id="projects" className="py-32 md:py-40 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">
              What We Build
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Focus <span className="text-gradient-gold">Areas</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From AI-powered systems to startup ecosystems, here are the types of projects we specialize in.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                data-testid={`card-project-${i}`}
                className={`group h-full p-8 rounded-2xl bg-card border border-border/50 ${project.accent ? "hover-glow-cyan" : "hover-glow"} flex flex-col transition-all duration-300 hover:-translate-y-2 relative overflow-hidden`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`p-3 rounded-xl mb-6 w-fit ${project.accent ? "bg-cyan-500/10" : "bg-amber-500/10"}`}>
                    <project.icon size={28} className={project.accent ? "text-cyan-400" : "text-amber-400"} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{project.desc}</p>
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
    { icon: BrainCircuit, text: "AI-first thinking across every solution we deliver", color: "text-cyan-400" },
    { icon: Palette, text: "Premium design quality that builds brand trust", color: "text-amber-400" },
    { icon: Server, text: "Scalable, modern architecture built for growth", color: "text-cyan-400" },
    { icon: Target, text: "Strategic business focus with measurable outcomes", color: "text-amber-400" },
    { icon: Zap, text: "Innovation-driven execution and fast delivery", color: "text-cyan-400" },
    { icon: Shield, text: "Future-ready systems designed for long-term value", color: "text-amber-400" },
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
                  Your <span className="text-gradient-gold">Competitive Edge</span>
                </h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                We combine deep technical expertise with premium design sensibility to deliver digital solutions that don't just work — they set you apart. Choosing Denarixx means investing in quality, innovation, and results.
              </p>
              
              <div className="space-y-5">
                {highlights.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${item.color === "text-cyan-400" ? "bg-cyan-500/10" : "bg-amber-500/10"}`}>
                      <item.icon size={20} className={`${item.color} flex-shrink-0`} />
                    </div>
                    <p className="text-foreground font-medium">{item.text}</p>
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
                  <h3 className="text-2xl font-bold text-foreground">What sets us apart</h3>
                  <p className="text-sm text-muted-foreground">Built on principles that deliver real results.</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { label: "Tailored Solutions", desc: "Every project is custom-built for your specific needs", icon: Target },
                    { label: "Modern Technology", desc: "We use the latest frameworks, tools, and AI capabilities", icon: Code2 },
                    { label: "Long-Term Partnership", desc: "We support your growth well beyond the initial launch", icon: Shield },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
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
            <span>Ready to Get Started?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Let's Build Something <span className="text-gradient-gold">Remarkable</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you need an AI system, a new website, or a complete digital transformation — we're ready to help you take the next step.
          </p>
          
          <PremiumButton size="lg" onClick={() => scrollTo("#contact")} data-testid="button-cta-banner">
            Start Your Project
            <ArrowRight size={18} className="ml-2" />
          </PremiumButton>
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
                  Let's Create <span className="text-gradient-gold">Together</span>
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have a project in mind? Tell us about your goals and we'll get back to you with a plan. We work with businesses of all sizes — from startups to established enterprises.
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
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-card">
                <img src={logoUrl} alt="Denarixx AI & Digital Solutions" className="h-8 mb-4 opacity-80" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Denarixx AI & Digital Solutions — Building intelligent digital solutions for businesses, startups, and brands worldwide.
                </p>
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
                  placeholder="Your name" 
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
                  placeholder="you@company.com" 
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
                  placeholder="Tell us about your project, goals, and timeline..." 
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

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Vision", href: "#vision" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    "AI Solutions",
    "Web Design & Development",
    "Automation & Digital Transformation",
    "Branding & Creative Design",
    "Digital Strategy & Consulting",
  ];

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 pb-16 border-b border-border/30">
          <div className="lg:col-span-1">
            <img
              src={logoUrl}
              alt="Denarixx AI & Digital Solutions"
              className="h-9 mb-6 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={scrollToTop}
            />
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Denarixx AI & Digital Solutions builds intelligent digital products, AI systems, and premium online experiences for ambitious businesses worldwide.
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
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-200 flex-shrink-0" />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-3 mb-8">
              <li><a href="#" data-testid="link-privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" data-testid="link-terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" data-testid="link-impressum" className="text-sm text-muted-foreground hover:text-primary transition-colors">Impressum</a></li>
              <li><a href="#" data-testid="link-cookie-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Denarixx AI & Digital Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
              data-testid="button-back-to-top"
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
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <VisionSection />
        <ProjectsSection />
        <WhyUsSection />
        <CTABannerSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
