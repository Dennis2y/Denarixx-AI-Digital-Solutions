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
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Mail,
  MapPin,
  ChevronRight
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { PremiumButton } from "@/components/ui/premium-button";
import { Input } from "@/components/ui/premium-input";
import { Textarea } from "@/components/ui/premium-textarea";
import { useSubmitContact } from "@/hooks/use-contact";
import { insertContactSchema } from "@shared/schema";
import logoUrl from "@assets/Denarixx_1772975867904.png";

// --- Fade In Component for Scroll Animations ---
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

// --- Sections ---

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
            We fuse cutting-edge AI technology with premium design to architect digital experiences that define the future of your business.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <PremiumButton size="lg" onClick={() => scrollTo("#projects")} className="w-full sm:w-auto">
              Explore Our Work
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </PremiumButton>
            <PremiumButton size="lg" variant="outline" onClick={() => scrollTo("#services")} className="w-full sm:w-auto">
              Our Services
            </PremiumButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 z-0">
        <img 
          src="/media/tech-abstract-bg.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
              {/* elegant architecture structure black and gold lighting abstract */}
              <img 
                src="/media/tech-abstract-bg.png" 
                alt="Abstract Architecture" 
                className="relative rounded-2xl border border-border/50 object-cover aspect-[4/5] shadow-2xl filter grayscale-[50%] contrast-[1.2]"
              />
              <div className="absolute -bottom-8 -right-8 p-8 bg-card border border-border rounded-xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold text-gradient-gold mb-2">10x</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Digital Acceleration</p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Engineering the <br/> <span className="text-gradient-gold">Unimaginable</span>.
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              We are not just a digital agency; we are architects of tomorrow. By intertwining artificial intelligence with human-centric design, we create ecosystems that don't just exist—they perform, adapt, and dominate.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our approach strips away the noise, focusing on absolute precision, luxury aesthetics, and unparalleled technical performance to elevate your brand above the competition.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/50">
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">Innovation</h4>
                <p className="text-sm text-muted-foreground">AI-first strategies that keep you ahead of the curve.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">Precision</h4>
                <p className="text-sm text-muted-foreground">Flawless execution down to the last pixel and line of code.</p>
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
    { icon: Bot, title: "AI Integration", desc: "Embed intelligent models into your workflow to automate complex tasks and generate new insights." },
    { icon: Layers, title: "Premium Web Design", desc: "Award-winning, high-conversion interfaces crafted with meticulous attention to typography and space." },
    { icon: Cpu, title: "System Automation", desc: "Streamline operations with custom software that connects your disparate tools into one cohesive engine." },
    { icon: Sparkles, title: "Brand Identity", desc: "Position your company as a luxury market leader with identity systems that command respect." },
    { icon: TrendingUp, title: "Business Strategy", desc: "Data-driven roadmaps designed to scale your operations and maximize ROI in the digital space." },
    { icon: ShieldCheck, title: "Cyber Security", desc: "Enterprise-grade protection ensuring your digital assets and client data remain impregnable." },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 z-0">
        <img 
          src="/media/innovation-bg.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <h2 className="text-sm text-primary uppercase tracking-[0.2em] font-semibold mb-4">Core Capabilities</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6">Expertise that drives <span className="text-gradient-gold">Growth</span></h3>
            <p className="text-muted-foreground text-lg">Comprehensive digital solutions engineered for the modern luxury brand.</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="group h-full p-8 rounded-2xl bg-card border border-border/50 hover-glow flex flex-col items-start transition-all duration-300 hover:-translate-y-1 cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
                
                <div className="p-3 bg-secondary rounded-lg mb-6 group-hover:bg-primary/10 transition-colors">
                  <service.icon size={28} className="text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground">{service.title}</h4>
                <p className="text-muted-foreground leading-relaxed flex-grow">{service.desc}</p>
                
                <div className="mt-8 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Learn more <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section id="vision" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden bg-card border border-border">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
            {/* AI Network Background */}
            <img 
              src="/media/ai-network-bg.png" 
              alt="Vision Background" 
              className="absolute inset-0 w-full h-full object-cover object-right opacity-30 filter grayscale-[30%]"
            />
            
            <div className="relative z-20 p-8 md:p-16 lg:p-24 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-[1px] bg-primary" />
                <span className="text-primary text-sm uppercase tracking-widest font-semibold">The Vision</span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                Pioneering the next generation of <span className="text-gradient-gold">Digital Sovereignty</span>.
              </h3>
              
              <p className="text-xl text-muted-foreground mb-10 font-light leading-relaxed">
                We believe the future belongs to those who blend uncompromising aesthetics with profound technical intelligence. Our mission is to elevate ambitious brands into digital powerhouses.
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Relentless Pursuit of Perfection</p>
                  <p className="text-xs text-muted-foreground">In design, code, and strategy.</p>
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
    { value: "99.9%", label: "System Uptime" },
    { value: "5x", label: "Average ROI Increase" },
    { value: "< 0.5s", label: "Load Times" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section id="why-us" className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Why partner with <span className="text-gradient-gold">Denarixx</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We don't build generic templates. We craft bespoke digital ecosystems designed to dominate your market sector. Choosing us means choosing a relentless commitment to excellence.
              </p>
              
              <div className="space-y-6">
                {[
                  "Exclusive, high-end design language",
                  "Performance-optimized modern tech stacks",
                  "Deep integration of generative AI",
                  "White-glove communication and support"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-foreground font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-2 gap-6 content-center">
            {metrics.map((metric, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border-gradient-gold bg-card text-center hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">{metric.value}</p>
                  <p className="text-sm text-primary uppercase tracking-wider font-semibold">{metric.label}</p>
                </div>
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
  
  // Create schema type from the shared Zod schema
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
    <section id="contact" className="py-24 md:py-32 bg-secondary/30 border-t border-border/50 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Initiate a <span className="text-gradient-gold">Dialogue</span>.
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Ready to elevate your digital presence? Reach out to discuss how our AI-driven strategies and premium design can transform your business.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-card border border-border rounded-lg">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-foreground font-bold mb-1">Direct Inquiry</h4>
                  <p className="text-muted-foreground">hello@denarixx.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-card border border-border rounded-lg">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="text-foreground font-bold mb-1">Headquarters</h4>
                  <p className="text-muted-foreground">Silicon Valley, California<br/>Global Remote Operations</p>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-10 rounded-2xl bg-card border border-border/50 shadow-2xl space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input 
                  placeholder="John Doe" 
                  {...form.register("name")}
                  className={form.formState.errors.name ? "border-destructive/50 focus-visible:border-destructive" : ""}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  {...form.register("email")}
                  className={form.formState.errors.email ? "border-destructive/50 focus-visible:border-destructive" : ""}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Project Details</label>
                <Textarea 
                  placeholder="Tell us about your vision..." 
                  {...form.register("message")}
                  className={form.formState.errors.message ? "border-destructive/50 focus-visible:border-destructive" : ""}
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <PremiumButton type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Transmitting..." : "Send Message"}
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
    <footer className="bg-background py-12 border-t border-border/30">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={scrollToTop}>
          <img src={logoUrl} alt="Denarixx Logo" className="h-6 opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Denarixx. All rights reserved.
        </p>
        
        <div className="flex gap-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms</a>
        </div>
      </div>
    </footer>
  );
}

// --- Main Page Export ---

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <VisionSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
