import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { PremiumButton } from "@/components/ui/premium-button";
import { Input } from "@/components/ui/premium-input";
import { Textarea } from "@/components/ui/premium-textarea";
import { useSubmitContact } from "@/hooks/use-contact";
import { insertContactSchema } from "@shared/schema";

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

export default function Contact() {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32">
        <section className="py-24 md:py-32 bg-secondary/30 border-t border-border/50 relative">
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
      </main>
    </div>
  );
}
