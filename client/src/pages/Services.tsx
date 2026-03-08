import { motion } from "framer-motion";
import { Bot, Layers, Cpu, Sparkles, TrendingUp, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

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

export default function Services() {
  const services = [
    { icon: Bot, title: "AI Integration", desc: "Embed intelligent models into your workflow to automate complex tasks and generate new insights." },
    { icon: Layers, title: "Premium Web Design", desc: "Award-winning, high-conversion interfaces crafted with meticulous attention to typography and space." },
    { icon: Cpu, title: "System Automation", desc: "Streamline operations with custom software that connects your disparate tools into one cohesive engine." },
    { icon: Sparkles, title: "Brand Identity", desc: "Position your company as a luxury market leader with identity systems that command respect." },
    { icon: TrendingUp, title: "Business Strategy", desc: "Data-driven roadmaps designed to scale your operations and maximize ROI in the digital space." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32">
        <section className="py-24 md:py-32 bg-secondary/20 border-y border-border/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 z-0">
            <img 
              src="/media/innovation-bg.png" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
      </main>
    </div>
  );
}
