import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLocation } from "wouter";
import { Sparkles, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { PremiumButton } from "@/components/ui/premium-button";

export default function Landing() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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
              <PremiumButton size="lg" onClick={() => setLocation("/about")} className="w-full sm:w-auto">
                Explore Services
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </PremiumButton>
              <PremiumButton size="lg" variant="outline" onClick={() => setLocation("/contact")} className="w-full sm:w-auto">
                Contact Us
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
