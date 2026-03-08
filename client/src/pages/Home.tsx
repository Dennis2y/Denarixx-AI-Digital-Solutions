import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  Rocket
} from "lucide-react";

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
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

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
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/media/hero_video.mp4" type="video/mp4" />
      </video>

      {/* Background Effects */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>The New Era of Digital Excellence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Building <span className="text-gradient-gold">Intelligent</span> <br className="hidden md:block"/> Digital Solutions
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            We architect cutting-edge AI-driven digital ecosystems that redefine how brands operate, innovate, and scale in the modern economy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <PremiumButton size="lg" onClick={() => scrollTo("#services")} className="w-full sm:w-auto">
              Explore Services
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </PremiumButton>
            <PremiumButton size="lg" variant="outline" onClick={() => scrollTo("#contact")} className="w-full sm:w-auto">
              Contact Us
            </PremiumButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img 
          src="/media/tech-abstract-bg.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">
                  About Denarixx
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Engineering the <span className="text-gradient-gold">Unimaginable</span>.
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
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Rocket className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Innovation First</h4>
                    <p className="text-sm text-muted-foreground">AI-driven strategies that keep you years ahead of competition.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Award className="text-primary" size={24} />
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
      color: "from-blue-500/20 to-cyan-500/10"
    },
    { 
      icon: Layers, 
      title: "Premium Web Design", 
      desc: "Award-winning, conversion-optimized interfaces crafted with obsessive attention to typography, interaction design, and visual hierarchy.",
      color: "from-purple-500/20 to-pink-500/10"
    },
    { 
      icon: Cpu, 
      title: "System Automation", 
      desc: "Transform disparate tools and processes into seamless, intelligent systems that reduce friction and multiply operational efficiency.",
      color: "from-emerald-500/20 to-teal-500/10"
    },
    { 
      icon: Sparkles, 
      title: "Brand Identity", 
      desc: "Establish market dominance through cohesive, luxury-tier identity systems that command respect and resonate with premium audiences.",
      color: "from-amber-500/20 to-orange-500/10"
    },
    { 
      icon: TrendingUp, 
      title: "Digital Strategy", 
      desc: "Data-driven roadmaps engineered to scale operations, maximize ROI, and position your brand as an industry innovator.",
      color: "from-rose-500/20 to-red-500/10"
    },
  ];

  return (
    <section id="services" className="py-32 md:py-40 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img 
          src="/media/innovation-bg.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">
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
              <div className="group h-full p-8 rounded-2xl bg-card border border-border/50 hover-glow flex flex-col transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="p-3 bg-secondary rounded-xl mb-6 group-hover:bg-primary/20 transition-colors w-fit">
                    <service.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-gradient-gold transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow text-sm">{service.desc}</p>
                  
                  <div className="mt-8 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
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

function WhyUsSection() {
  const metrics = [
    { value: "99.9%", label: "System Uptime", icon: "⚡" },
    { value: "5x", label: "Avg ROI Increase", icon: "📈" },
    { value: "< 0.5s", label: "Load Times", icon: "⚙️" },
    { value: "100%", label: "Client Satisfaction", icon: "⭐" },
  ];

  const highlights = [
    "Luxury-tier design language & brand positioning",
    "AI-native architecture & automation",
    "Performance-optimized at every level",
    "Dedicated partnership & support model"
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
                We don't build commodities. We engineer bespoke digital ecosystems engineered for market dominance. Choosing Denarixx means betting on relentless excellence.
              </p>
              
              <div className="space-y-4">
                {highlights.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-foreground font-medium text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 gap-6 content-center">
            {metrics.map((metric, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card text-center hover-glow transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <p className="text-5xl font-bold text-gradient-gold mb-3">{metric.value}</p>
                    <p className="text-sm text-primary uppercase tracking-wider font-semibold">{metric.label}</p>
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
              
              <div className="space-y-8 pt-8 border-t border-border/50">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card border border-border rounded-lg flex-shrink-0">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Email</h4>
                    <p className="text-muted-foreground">hello@denarixx.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-card border border-border rounded-lg flex-shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Location</h4>
                    <p className="text-muted-foreground">Silicon Valley, California<br/>Global Remote Operations</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-10 rounded-3xl bg-card border border-border/50 shadow-2xl space-y-6 hover-glow transition-all duration-300">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground uppercase tracking-wide">Name</label>
                <Input 
                  placeholder="John Doe" 
                  {...form.register("name")}
                  className={`text-base ${form.formState.errors.name ? "border-destructive/50 focus-visible:border-destructive" : ""}`}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground uppercase tracking-wide">Email</label>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
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
                  placeholder="Tell us about your vision..." 
                  {...form.register("message")}
                  className={`text-base ${form.formState.errors.message ? "border-destructive/50 focus-visible:border-destructive" : ""}`}
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <PremiumButton type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Sending..." : "Send Message"}
              </PremiumButton>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  
  return (
    <footer className="bg-background py-16 border-t border-border/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-border/50">
          <div>
            <img src={logoUrl} alt="Denarixx Logo" className="h-8 mb-4 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={scrollToTop} />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engineering the future through AI, innovation, and relentless excellence.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2">
              {["About", "Services", "Innovation", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Denarixx AI & Digital Solutions. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-4 md:mt-0">
            Crafted with precision • Powered by innovation
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <InnovationSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
