import { motion } from "framer-motion";
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

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32">
        <section className="py-24 md:py-32 relative overflow-hidden">
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
      </main>
    </div>
  );
}
