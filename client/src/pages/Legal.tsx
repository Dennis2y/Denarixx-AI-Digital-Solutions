import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Navbar } from "@/components/layout/Navbar";

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <a href="/" className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-8 hover:text-primary/80 transition-colors" data-testid="link-back-home">
            <ArrowLeft size={16} />
            {t("legal.back")}
          </a>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <div className="w-16 h-1 bg-primary rounded-full mb-8" />
          <p className="text-sm text-white/90/60 mb-12">{t("legal.updated")}</p>
          <div className="prose prose-invert max-w-none space-y-8 text-white/90 leading-relaxed">
            {children}
          </div>
        </div>
      </main>
      <footer className="border-t border-border/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-white/90/40">&copy; {new Date().getFullYear()} Denarixx Digital Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}

export function PrivacyPolicy() {
  const { t } = useLanguage();
  return (
    <LegalLayout title={t("footer.privacy")}>
      <Section title={t("privacy.s1.title")}>
        <p>{t("privacy.s1.p1")}</p>
        <p>{t("privacy.s1.p2")}</p>
      </Section>

      <Section title={t("privacy.s2.title")}>
        <p>{t("privacy.s2.p1")}</p>
        <p className="pl-4 border-l-2 border-primary/30 whitespace-pre-line">
          {t("privacy.s2.info")}
        </p>
      </Section>

      <Section title={t("privacy.s3.title")}>
        <p>{t("privacy.s3.p1")}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("privacy.s3.li1")}</li>
          <li>{t("privacy.s3.li2")}</li>
          <li>{t("privacy.s3.li3")}</li>
        </ul>
      </Section>

      <Section title={t("privacy.s4.title")}>
        <p>{t("privacy.s4.p1")}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("privacy.s4.li1")}</li>
          <li>{t("privacy.s4.li2")}</li>
          <li>{t("privacy.s4.li3")}</li>
          <li>{t("privacy.s4.li4")}</li>
        </ul>
      </Section>

      <Section title={t("privacy.s5.title")}>
        <p>{t("privacy.s5.p1")}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("privacy.s5.li1")}</li>
          <li>{t("privacy.s5.li2")}</li>
          <li>{t("privacy.s5.li3")}</li>
        </ul>
      </Section>

      <Section title={t("privacy.s6.title")}>
        <p>{t("privacy.s6.p1")}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("privacy.s6.li1")}</li>
          <li>{t("privacy.s6.li2")}</li>
        </ul>
      </Section>

      <Section title={t("privacy.s7.title")}>
        <p>{t("privacy.s7.p1")}</p>
      </Section>

      <Section title={t("privacy.s8.title")}>
        <p>{t("privacy.s8.p1")}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("privacy.s8.li1")}</li>
          <li>{t("privacy.s8.li2")}</li>
          <li>{t("privacy.s8.li3")}</li>
          <li>{t("privacy.s8.li4")}</li>
          <li>{t("privacy.s8.li5")}</li>
          <li>{t("privacy.s8.li6")}</li>
        </ul>
        <p>{t("privacy.s8.p2")}</p>
      </Section>

      <Section title={t("privacy.s9.title")}>
        <p>{t("privacy.s9.p1")}</p>
      </Section>

      <Section title={t("privacy.s10.title")}>
        <p>{t("privacy.s10.p1")}</p>
      </Section>

      <Section title={t("privacy.s11.title")}>
        <p>{t("privacy.s11.p1")}</p>
        <p className="pl-4 border-l-2 border-primary/30">
          Denarixx Digital Solutions<br />
          Email: hello@denarixxai.com
        </p>
      </Section>
    </LegalLayout>
  );
}

export function TermsConditions() {
  const { t } = useLanguage();
  return (
    <LegalLayout title={t("footer.terms")}>
      <Section title={t("terms.s1.title")}>
        <p>{t("terms.s1.p1")}</p>
      </Section>

      <Section title={t("terms.s2.title")}>
        <p>{t("terms.s2.p1")}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("terms.s2.li1")}</li>
          <li>{t("terms.s2.li2")}</li>
          <li>{t("terms.s2.li3")}</li>
          <li>{t("terms.s2.li4")}</li>
          <li>{t("terms.s2.li5")}</li>
        </ul>
        <p>{t("terms.s2.p2")}</p>
      </Section>

      <Section title={t("terms.s3.title")}>
        <p>{t("terms.s3.p1")}</p>
        <p>{t("terms.s3.p2")}</p>
      </Section>

      <Section title={t("terms.s4.title")}>
        <p>{t("terms.s4.p1")}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("terms.s4.li1")}</li>
          <li>{t("terms.s4.li2")}</li>
          <li>{t("terms.s4.li3")}</li>
          <li>{t("terms.s4.li4")}</li>
          <li>{t("terms.s4.li5")}</li>
        </ul>
      </Section>

      <Section title={t("terms.s5.title")}>
        <p>{t("terms.s5.p1")}</p>
      </Section>

      <Section title={t("terms.s6.title")}>
        <p>{t("terms.s6.p1")}</p>
        <p>{t("terms.s6.p2")}</p>
      </Section>

      <Section title={t("terms.s7.title")}>
        <p>{t("terms.s7.p1")}</p>
      </Section>

      <Section title={t("terms.s8.title")}>
        <p>{t("terms.s8.p1")}</p>
      </Section>

      <Section title={t("terms.s9.title")}>
        <p>{t("terms.s9.p1")}</p>
      </Section>

      <Section title={t("terms.s10.title")}>
        <p>{t("terms.s10.p1")}</p>
      </Section>

      <Section title={t("terms.s11.title")}>
        <p>{t("terms.s11.p1")}</p>
        <p className="pl-4 border-l-2 border-primary/30">
          Denarixx Digital Solutions<br />
          Email: hello@denarixxai.com
        </p>
      </Section>
    </LegalLayout>
  );
}

export function ImpressumPage() {
  const { t } = useLanguage();
  return (
    <LegalLayout title={t("footer.impressum")}>
      <Section title={t("impressum.s1.title")}>
        <p className="pl-4 border-l-2 border-primary/30 whitespace-pre-line">
          {t("impressum.s1.info")}
        </p>
      </Section>

      <Section title={t("impressum.s2.title")}>
        <p>{t("impressum.s2.p1")}</p>
      </Section>

      <Section title={t("impressum.s3.title")}>
        <p className="pl-4 border-l-2 border-primary/30 whitespace-pre-line">
          {t("impressum.s3.info")}
        </p>
      </Section>

      <Section title={t("impressum.s4.title")}>
        <p>{t("impressum.s4.p1")}</p>
        <p>{t("impressum.s4.p2")}</p>
      </Section>

      <Section title={t("impressum.s5.title")}>
        <p>{t("impressum.s5.p1")}</p>
        <p>{t("impressum.s5.p2")}</p>
      </Section>

      <Section title={t("impressum.s6.title")}>
        <p>{t("impressum.s6.p1")}</p>
        <p>{t("impressum.s6.p2")}</p>
      </Section>

      <Section title={t("impressum.s7.title")}>
        <p>{t("impressum.s7.p1")}</p>
        <p>{t("impressum.s7.p2")}</p>
      </Section>
    </LegalLayout>
  );
}

export function CookiePolicy() {
  const { t } = useLanguage();
  return (
    <LegalLayout title={t("footer.cookies")}>
      <Section title={t("cookies.s1.title")}>
        <p>{t("cookies.s1.p1")}</p>
      </Section>

      <Section title={t("cookies.s2.title")}>
        <p>{t("cookies.s2.p1")}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("cookies.s2.li1")}</li>
          <li>{t("cookies.s2.li2")}</li>
          <li>{t("cookies.s2.li3")}</li>
        </ul>
      </Section>

      <Section title={t("cookies.s3.title")}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border/30 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-card border-b border-border/30">
                <th className="text-left p-3 text-white font-semibold">{t("cookies.s3.cookie")}</th>
                <th className="text-left p-3 text-white font-semibold">{t("cookies.s3.type")}</th>
                <th className="text-left p-3 text-white font-semibold">{t("cookies.s3.purpose")}</th>
                <th className="text-left p-3 text-white font-semibold">{t("cookies.s3.duration")}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/20">
                <td className="p-3 text-white/80">language</td>
                <td className="p-3">{t("cookies.s3.r1.type")}</td>
                <td className="p-3">{t("cookies.s3.r1.purpose")}</td>
                <td className="p-3">{t("cookies.s3.r1.duration")}</td>
              </tr>
              <tr className="border-b border-border/20">
                <td className="p-3 text-white/80">theme</td>
                <td className="p-3">{t("cookies.s3.r2.type")}</td>
                <td className="p-3">{t("cookies.s3.r2.purpose")}</td>
                <td className="p-3">{t("cookies.s3.r2.duration")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={t("cookies.s4.title")}>
        <p>{t("cookies.s4.p1")}</p>
      </Section>

      <Section title={t("cookies.s5.title")}>
        <p>{t("cookies.s5.p1")}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("cookies.s5.li1")}</li>
          <li>{t("cookies.s5.li2")}</li>
          <li>{t("cookies.s5.li3")}</li>
          <li>{t("cookies.s5.li4")}</li>
          <li>{t("cookies.s5.li5")}</li>
        </ul>
        <p>{t("cookies.s5.p2")}</p>
      </Section>

      <Section title={t("cookies.s6.title")}>
        <p>{t("cookies.s6.p1")}</p>
      </Section>

      <Section title={t("cookies.s7.title")}>
        <p>{t("cookies.s7.p1")}</p>
        <p className="pl-4 border-l-2 border-primary/30">
          Denarixx Digital Solutions<br />
          Email: hello@denarixxai.com
        </p>
      </Section>
    </LegalLayout>
  );
}