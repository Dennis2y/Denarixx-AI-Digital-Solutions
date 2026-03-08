import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Navbar } from "@/components/layout/Navbar";

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <a href="/" className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-8 hover:text-primary/80 transition-colors" data-testid="link-back-home">
            <ArrowLeft size={16} />
            Back to Home
          </a>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h1>
          <div className="w-16 h-1 bg-primary rounded-full mb-8" />
          <p className="text-sm text-muted-foreground/60 mb-12">Last updated: March 2026</p>
          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </main>
      <footer className="border-t border-border/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground/40">&copy; {new Date().getFullYear()} Denarixx AI & Digital Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export function PrivacyPolicy() {
  const { t } = useLanguage();
  return (
    <LegalLayout title={t("footer.privacy")}>
      <Section title="1. Introduction">
        <p>Denarixx AI & Digital Solutions ("Denarixx", "we", "us", or "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website or use our services.</p>
        <p>This policy applies to all visitors, users, and clients who interact with our website and digital services.</p>
      </Section>

      <Section title="2. Data Controller">
        <p>The data controller responsible for your personal data is:</p>
        <p className="pl-4 border-l-2 border-primary/30">
          Denarixx AI & Digital Solutions<br />
          Represented by Dennis Charles<br />
          Email: hello@denarixxai.com
        </p>
      </Section>

      <Section title="3. Data We Collect">
        <p>We may collect the following types of data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Contact form data:</strong> Name, email address, subject, and message content when you submit our contact form.</li>
          <li><strong className="text-foreground">Usage data:</strong> Pages visited, time spent on pages, browser type, device information, and IP address collected through standard server logs.</li>
          <li><strong className="text-foreground">Cookie data:</strong> Information stored through cookies and similar technologies as described in our Cookie Policy.</li>
        </ul>
      </Section>

      <Section title="4. How We Use Your Data">
        <p>We use your personal data for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To respond to your inquiries submitted through our contact form.</li>
          <li>To improve our website performance and user experience.</li>
          <li>To comply with legal obligations.</li>
          <li>To protect our legitimate business interests.</li>
        </ul>
      </Section>

      <Section title="5. Legal Basis for Processing (GDPR)">
        <p>We process your personal data based on the following legal grounds:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Consent:</strong> When you submit a contact form or subscribe to communications.</li>
          <li><strong className="text-foreground">Legitimate interest:</strong> To improve our website and services.</li>
          <li><strong className="text-foreground">Legal obligation:</strong> To comply with applicable laws and regulations.</li>
        </ul>
      </Section>

      <Section title="6. Data Sharing">
        <p>We do not sell, rent, or trade your personal data. We may share data with:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Hosting and infrastructure providers necessary to operate our website.</li>
          <li>Legal authorities when required by law.</li>
        </ul>
      </Section>

      <Section title="7. Data Retention">
        <p>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy. Contact form submissions are stored securely and reviewed periodically. Data that is no longer needed is deleted or anonymized.</p>
      </Section>

      <Section title="8. Your Rights">
        <p>Under applicable data protection laws (including GDPR), you have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your data ("right to be forgotten").</li>
          <li>Restrict or object to processing of your data.</li>
          <li>Data portability — receive your data in a structured, machine-readable format.</li>
          <li>Withdraw consent at any time.</li>
        </ul>
        <p>To exercise any of these rights, contact us at <strong className="text-foreground">hello@denarixxai.com</strong>.</p>
      </Section>

      <Section title="9. Data Security">
        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encrypted data transmission, secure server infrastructure, and access controls.</p>
      </Section>

      <Section title="10. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
      </Section>

      <Section title="11. Contact">
        <p>If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at:</p>
        <p className="pl-4 border-l-2 border-primary/30">
          Denarixx AI & Digital Solutions<br />
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
      <Section title="1. Scope">
        <p>These Terms & Conditions ("Terms") govern your use of the website and services provided by Denarixx AI & Digital Solutions ("Denarixx", "we", "us"). By accessing our website or engaging our services, you agree to be bound by these Terms.</p>
      </Section>

      <Section title="2. Services">
        <p>Denarixx provides digital solutions including but not limited to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Web design and development</li>
          <li>AI system development and integration</li>
          <li>Automation platforms and workflows</li>
          <li>Digital strategy and consulting</li>
          <li>Branding and digital identity</li>
        </ul>
        <p>All project scopes, deliverables, timelines, and pricing are agreed upon individually with each client through separate project agreements.</p>
      </Section>

      <Section title="3. Intellectual Property">
        <p>All content on this website — including text, images, graphics, logos, videos, and code — is the intellectual property of Denarixx AI & Digital Solutions unless otherwise stated. You may not reproduce, distribute, or use our content without prior written consent.</p>
        <p>For client projects, intellectual property rights and usage licenses are defined in the individual project agreement.</p>
      </Section>

      <Section title="4. Website Use">
        <p>You agree to use our website lawfully and responsibly. You must not:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the website for any unlawful purpose.</li>
          <li>Attempt to gain unauthorized access to our systems.</li>
          <li>Interfere with the website's functionality or security.</li>
          <li>Transmit harmful code, viruses, or malicious data.</li>
          <li>Scrape, copy, or reproduce website content without permission.</li>
        </ul>
      </Section>

      <Section title="5. Contact Form & Communications">
        <p>When you submit a contact form or communicate with us, you confirm that the information provided is accurate. We will use your information solely to respond to your inquiry and will not share it with third parties for marketing purposes.</p>
      </Section>

      <Section title="6. Limitation of Liability">
        <p>Denarixx provides this website and its content on an "as is" basis. While we strive for accuracy, we make no warranties regarding the completeness, reliability, or availability of the website or its content.</p>
        <p>To the maximum extent permitted by law, Denarixx shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services.</p>
      </Section>

      <Section title="7. External Links">
        <p>Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or availability of these external sites. Accessing them is at your own risk.</p>
      </Section>

      <Section title="8. Confidentiality">
        <p>Any project-related information, proposals, or communications shared between Denarixx and its clients are considered confidential and shall not be disclosed to third parties without mutual written consent.</p>
      </Section>

      <Section title="9. Governing Law">
        <p>These Terms are governed by and construed in accordance with the laws of the Federal Republic of Germany. Any disputes arising from these Terms shall be subject to the jurisdiction of the competent courts in Germany.</p>
      </Section>

      <Section title="10. Changes to Terms">
        <p>We reserve the right to modify these Terms at any time. Changes take effect upon publication on this page. Continued use of the website after changes constitutes acceptance of the updated Terms.</p>
      </Section>

      <Section title="11. Contact">
        <p>For questions regarding these Terms, please contact us at:</p>
        <p className="pl-4 border-l-2 border-primary/30">
          Denarixx AI & Digital Solutions<br />
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
      <Section title="Information according to § 5 TMG">
        <p className="pl-4 border-l-2 border-primary/30">
          Denarixx AI & Digital Solutions<br />
          Represented by: Dennis Charles<br />
          Email: hello@denarixxai.com
        </p>
      </Section>

      <Section title="Contact">
        <p>Email: hello@denarixxai.com</p>
      </Section>

      <Section title="Responsible for Content (§ 55 Abs. 2 RStV)">
        <p className="pl-4 border-l-2 border-primary/30">
          Dennis Charles<br />
          Denarixx AI & Digital Solutions<br />
          Email: hello@denarixxai.com
        </p>
      </Section>

      <Section title="EU Dispute Resolution">
        <p>The European Commission provides a platform for online dispute resolution (ODR): <span className="text-primary">https://ec.europa.eu/consumers/odr</span></p>
        <p>We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
      </Section>

      <Section title="Liability for Content">
        <p>As a service provider, we are responsible for our own content on these pages in accordance with § 7 para. 1 TMG under general laws. According to §§ 8 to 10 TMG, however, we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.</p>
        <p>Obligations to remove or block the use of information under general law remain unaffected by this. However, liability in this regard is only possible from the time of knowledge of a specific infringement. Upon becoming aware of corresponding violations, we will remove this content immediately.</p>
      </Section>

      <Section title="Liability for Links">
        <p>Our website contains links to external third-party websites, the content of which we have no influence over. Therefore, we cannot accept any liability for these external contents. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking.</p>
        <p>A permanent content control of the linked pages is not reasonable without concrete evidence of an infringement. Upon becoming aware of legal violations, we will remove such links immediately.</p>
      </Section>

      <Section title="Copyright">
        <p>The content and works created by the site operators on these pages are subject to German copyright law. The reproduction, processing, distribution, and any kind of exploitation beyond the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.</p>
        <p>Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. Upon becoming aware of legal violations, we will remove such content immediately.</p>
      </Section>
    </LegalLayout>
  );
}

export function CookiePolicy() {
  const { t } = useLanguage();
  return (
    <LegalLayout title={t("footer.cookies")}>
      <Section title="1. What Are Cookies?">
        <p>Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work efficiently and to provide information to website operators.</p>
      </Section>

      <Section title="2. How We Use Cookies">
        <p>Denarixx AI & Digital Solutions uses cookies for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Essential cookies:</strong> These are necessary for the website to function properly. They enable core functionality such as page navigation and access to secure areas. The website cannot function correctly without these cookies.</li>
          <li><strong className="text-foreground">Preference cookies:</strong> These cookies remember your settings and preferences, such as language selection and theme choice, to provide a more personalized experience.</li>
          <li><strong className="text-foreground">Performance cookies:</strong> These cookies help us understand how visitors interact with our website by collecting anonymous usage data. This information helps us improve our website's performance and user experience.</li>
        </ul>
      </Section>

      <Section title="3. Cookies We Use">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border/30 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-card border-b border-border/30">
                <th className="text-left p-3 text-foreground font-semibold">Cookie</th>
                <th className="text-left p-3 text-foreground font-semibold">Type</th>
                <th className="text-left p-3 text-foreground font-semibold">Purpose</th>
                <th className="text-left p-3 text-foreground font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/20">
                <td className="p-3 text-foreground/80">language</td>
                <td className="p-3">Preference</td>
                <td className="p-3">Stores your selected language preference</td>
                <td className="p-3">1 year</td>
              </tr>
              <tr className="border-b border-border/20">
                <td className="p-3 text-foreground/80">theme</td>
                <td className="p-3">Preference</td>
                <td className="p-3">Stores your dark/light mode preference</td>
                <td className="p-3">1 year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="4. Third-Party Cookies">
        <p>We do not use third-party advertising or tracking cookies. We do not share cookie data with third parties for marketing or advertising purposes.</p>
      </Section>

      <Section title="5. Managing Cookies">
        <p>You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>View what cookies are stored and delete them individually.</li>
          <li>Block third-party cookies.</li>
          <li>Block cookies from specific websites.</li>
          <li>Block all cookies.</li>
          <li>Delete all cookies when you close your browser.</li>
        </ul>
        <p>Please note that blocking or deleting cookies may affect the functionality of our website and your user experience.</p>
      </Section>

      <Section title="6. Changes to This Policy">
        <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. Please check this page periodically for updates.</p>
      </Section>

      <Section title="7. Contact">
        <p>If you have questions about our use of cookies, please contact us at:</p>
        <p className="pl-4 border-l-2 border-primary/30">
          Denarixx AI & Digital Solutions<br />
          Email: hello@denarixxai.com
        </p>
      </Section>
    </LegalLayout>
  );
}