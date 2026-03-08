import { motion } from "framer-motion";
import { Zap } from "lucide-react";
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

export default function Vision() {
  const metrics = [
    { value: "99.9%", label: "System Uptime" },
    { value: "5x", label: "Average ROI Increase" },
    { value: "< 0.5s", label: "Load Times" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32">
        {/* Vision Section */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <FadeIn>
              <div className="relative rounded-3xl overflow-hidden bg-card border border-border">
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
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

        {/* Why Us Section */}
        <section className="py-24 md:py-32">
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
      </main>
    </div>
  );
}
