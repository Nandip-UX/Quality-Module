"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileCheck, BookOpen, UserCheck, CreditCard, ShieldCheck, FileText, Scale, Server, AlertTriangle, ShieldOff, XCircle, Gavel, RefreshCw, Settings, Mail, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";

function Section({ icon: Icon, number, title, children, defaultOpen = false }: {
  icon: React.ElementType;
  number: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-stone-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left bg-white hover:bg-stone-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Section {number}</span>
          <h2 className="font-display text-lg md:text-xl font-bold text-stone-900 mt-0.5">{title}</h2>
        </div>
        <ChevronDown className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 md:px-6 pb-6 pt-2 border-t border-stone-100 bg-stone-50/50">
          {children}
        </div>
      )}
    </div>
  );
}

function SubSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-bold text-stone-800 mb-2 flex items-center gap-2">
        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{number}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-stone-600 leading-relaxed mt-3">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="mt-3 space-y-2">{children}</ul>;
}

function LI({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm text-stone-600 leading-relaxed">
      <span className="text-primary mt-1 shrink-0">&#8226;</span>
      <span>{label && <strong className="text-stone-800">{label}: </strong>}{children}</span>
    </li>
  );
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-1.5 ml-auto">
            <Image src="/loader-icon.png" alt="QualityModule" width={32} height={32} className="w-8 h-8 object-contain" />
            <span className="font-display font-bold text-lg text-dark">
              Quality<span className="text-primary">Module</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-14 md:py-20">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Legal</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl">
            The rules that govern your use of QualityModule. Please read these terms carefully before using our platform.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              <FileCheck className="w-3 h-3" /> Binding Agreement
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-stone-100 text-stone-500 px-3 py-1.5 rounded-full">
              Last updated: March 26, 2026
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col gap-4">

          {/* 1. Acceptance */}
          <Section icon={FileCheck} number="1" title="Acceptance of Terms" defaultOpen={true}>
            <P>
              These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of QualityModule&apos;s digital quality management platform, including all related applications, APIs, and services (the &quot;Service&quot;). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
            </P>
            <P>
              If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
            </P>
          </Section>

          {/* 2. Definitions */}
          <Section icon={BookOpen} number="2" title="Definitions">
            <div className="mt-3 space-y-2">
              {[
                { term: "Account", def: "Your registered user account on QualityModule." },
                { term: "Workspace", def: "A project or organization space within the Service where teams collaborate." },
                { term: "Content", def: "All data, text, images, signatures, files, and other materials uploaded or generated through the Service." },
                { term: "Subscription", def: "The paid plan selected by your organization for access to the Service." },
                { term: "Administrator", def: "A user with elevated permissions to manage a Workspace." },
              ].map((item) => (
                <div key={item.term} className="flex gap-3 p-3 rounded-lg bg-white border border-stone-200">
                  <span className="text-sm font-bold text-primary shrink-0 w-28">&quot;{item.term}&quot;</span>
                  <span className="text-sm text-stone-600">{item.def}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* 3. Account Registration */}
          <Section icon={UserCheck} number="3" title="Account Registration">
            <UL>
              <LI>You must provide accurate, complete information during registration.</LI>
              <LI>You are responsible for maintaining the confidentiality of your credentials.</LI>
              <LI>You must notify us immediately of any unauthorized access to your Account.</LI>
              <LI>One person may not maintain more than one Account without authorization.</LI>
              <LI>You must be at least 16 years old to use the Service.</LI>
            </UL>
          </Section>

          {/* 4. Subscriptions & Payments */}
          <Section icon={CreditCard} number="4" title="Subscriptions &amp; Payments">
            <SubSection number="4.1" title="Plans">
              <P>
                The Service is offered under various subscription plans as described on our pricing page. Features and limits vary by plan.
              </P>
            </SubSection>

            <SubSection number="4.2" title="Billing">
              <UL>
                <LI>Subscriptions are billed in advance on a monthly or annual basis.</LI>
                <LI>All fees are exclusive of applicable taxes unless stated otherwise.</LI>
                <LI>Price changes will be communicated at least 30 days before the next billing cycle.</LI>
              </UL>
            </SubSection>

            <SubSection number="4.3" title="Refunds">
              <P>
                Annual subscriptions may be refunded within 14 days of purchase if no significant usage has occurred. Monthly subscriptions are non-refundable. Contact{" "}
                <a href="mailto:billing@qualitymodule.com" className="text-primary font-medium hover:underline">billing@qualitymodule.com</a> for refund requests.
              </P>
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm font-semibold text-amber-800">Refund Window</p>
                <p className="text-xs text-amber-700 mt-1">Annual plans: 14-day refund policy. Monthly plans: non-refundable.</p>
              </div>
            </SubSection>
          </Section>

          {/* 5. Permitted Use */}
          <Section icon={ShieldCheck} number="5" title="Permitted Use">
            <P>You agree to use the Service only for lawful purposes and in compliance with these Terms. You shall not:</P>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {[
                "Use for illegal or unauthorized purposes",
                "Attempt unauthorized access",
                "Upload malicious code or viruses",
                "Interfere with or disrupt the Service",
                "Reverse engineer or decompile",
                "Resell or redistribute without authorization",
                "Infringe third-party rights",
                "Scrape or harvest data automatically",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 p-2.5 rounded-lg bg-red-50/50 border border-red-100">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-stone-600">{item}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* 6. Your Content */}
          <Section icon={FileText} number="6" title="Your Content">
            <SubSection number="6.1" title="Ownership">
              <P>
                You retain all rights to the Content you upload to QualityModule. We do not claim ownership of your inspection data, checklists, snag reports, photos, signatures, or any other Content.
              </P>
            </SubSection>

            <SubSection number="6.2" title="License">
              <P>
                By uploading Content, you grant us a limited, non-exclusive license to host, store, process, and display your Content solely to provide and improve the Service. This license terminates when you delete your Content or close your Account.
              </P>
            </SubSection>

            <SubSection number="6.3" title="Responsibility">
              <P>
                You are solely responsible for the accuracy and legality of Content you upload. Inspection records, audit trails, and compliance documentation should be verified by qualified personnel within your organization.
              </P>
            </SubSection>

            <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-lg">
              <p className="text-sm font-semibold text-primary">Your Data, Your Ownership</p>
              <p className="text-xs text-stone-600 mt-1">We never claim ownership of your inspection data, checklists, or reports. You can export everything at any time.</p>
            </div>
          </Section>

          {/* 7. Intellectual Property */}
          <Section icon={Scale} number="7" title="Intellectual Property">
            <P>
              The Service, including its design, code, features, logos, and documentation, is owned by QualityModule and protected by intellectual property laws. These Terms do not grant you any rights to our trademarks, brand features, or proprietary technology beyond what is necessary to use the Service.
            </P>
          </Section>

          {/* 8. Data & Privacy */}
          <Section icon={ShieldCheck} number="8" title="Data &amp; Privacy">
            <P>
              Your use of the Service is also governed by our{" "}
              <Link href="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</Link>,
              which describes how we collect, use, and protect your data. By using the Service, you agree to our data practices as described therein.
            </P>
          </Section>

          {/* 9. Service Availability */}
          <Section icon={Server} number="9" title="Service Availability">
            <div className="mt-3 p-4 bg-white border border-stone-200 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">99.9%</p>
              <p className="text-xs text-stone-500 mt-1">Target Uptime SLA</p>
            </div>
            <UL>
              <LI>We target 99.9% uptime but do not guarantee uninterrupted availability.</LI>
              <LI>We may perform scheduled maintenance with reasonable advance notice.</LI>
              <LI>We are not liable for downtime caused by factors beyond our control (force majeure).</LI>
            </UL>
          </Section>

          {/* 10. Limitation of Liability */}
          <Section icon={AlertTriangle} number="10" title="Limitation of Liability">
            <P>To the maximum extent permitted by law:</P>
            <UL>
              <LI>QualityModule is provided &quot;as is&quot; without warranties of any kind, express or implied.</LI>
              <LI>We are not liable for any indirect, incidental, special, consequential, or punitive damages.</LI>
              <LI>Our total liability shall not exceed the amount you paid for the Service in the 12 months preceding the claim.</LI>
              <LI>We are not responsible for decisions made based on data in the Service. Professional judgement should always be applied to inspection and quality outcomes.</LI>
            </UL>
          </Section>

          {/* 11. Indemnification */}
          <Section icon={ShieldOff} number="11" title="Indemnification">
            <P>
              You agree to indemnify and hold harmless QualityModule, its officers, employees, and partners from any claims, damages, or expenses arising from your use of the Service, your Content, or your violation of these Terms.
            </P>
          </Section>

          {/* 12. Termination */}
          <Section icon={XCircle} number="12" title="Termination">
            <SubSection number="12.1" title="By You">
              <P>
                You may cancel your Subscription at any time through your account settings. Access continues until the end of the current billing period.
              </P>
            </SubSection>

            <SubSection number="12.2" title="By Us">
              <P>
                We may suspend or terminate your access if you violate these Terms, fail to pay fees, or if continued provision of the Service becomes impractical. We will provide reasonable notice except in cases of serious violation.
              </P>
            </SubSection>

            <SubSection number="12.3" title="Effect of Termination">
              <P>
                Upon termination, you may export your Content within 30 days. After this period, we may delete your data in accordance with our retention policies. Sections that by their nature should survive termination (e.g., Limitation of Liability, Indemnification) will survive.
              </P>
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm font-semibold text-amber-800">Data Export Window</p>
                <p className="text-xs text-amber-700 mt-1">You have 30 days after termination to export all your Content before it may be deleted.</p>
              </div>
            </SubSection>
          </Section>

          {/* 13. Dispute Resolution */}
          <Section icon={Gavel} number="13" title="Dispute Resolution">
            <UL>
              <LI>These Terms are governed by the laws of England and Wales.</LI>
              <LI>Disputes shall first be addressed through good-faith negotiation.</LI>
              <LI>If unresolved within 30 days, disputes may be submitted to binding arbitration under the rules of the London Court of International Arbitration (LCIA).</LI>
              <LI>Nothing herein prevents either party from seeking injunctive relief in court.</LI>
            </UL>
          </Section>

          {/* 14. Changes */}
          <Section icon={RefreshCw} number="14" title="Changes to Terms">
            <P>
              We may modify these Terms at any time. Material changes will be communicated via email or in-app notification at least 30 days before taking effect. Continued use of the Service after changes constitutes acceptance of the revised Terms.
            </P>
          </Section>

          {/* 15. General Provisions */}
          <Section icon={Settings} number="15" title="General Provisions">
            <div className="mt-3 space-y-2">
              {[
                { term: "Entire Agreement", desc: "These Terms, together with our Privacy Policy, constitute the entire agreement between you and QualityModule." },
                { term: "Severability", desc: "If any provision is found unenforceable, the remaining provisions remain in full effect." },
                { term: "Waiver", desc: "Failure to enforce any right does not constitute a waiver of that right." },
                { term: "Assignment", desc: "You may not assign your rights under these Terms without our consent." },
              ].map((item) => (
                <div key={item.term} className="flex gap-3 p-3 rounded-lg bg-white border border-stone-200">
                  <span className="text-sm font-bold text-stone-800 shrink-0 w-36">{item.term}</span>
                  <span className="text-sm text-stone-600">{item.desc}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* 16. Contact */}
          <Section icon={Mail} number="16" title="Contact Us" defaultOpen={true}>
            <P>For questions about these Terms, contact us at:</P>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <a href="mailto:legal@qualitymodule.com" className="flex items-center gap-3 p-4 rounded-lg bg-white border border-stone-200 hover:border-primary/30 hover:bg-primary/5 transition-colors group">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-stone-400">Email</p>
                  <p className="text-sm font-semibold text-stone-800 group-hover:text-primary transition-colors">legal@qualitymodule.com</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white border border-stone-200">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-stone-400">Address</p>
                  <p className="text-sm font-semibold text-stone-800">QualityModule Ltd., London, UK</p>
                </div>
              </div>
            </div>
          </Section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400">&copy;{new Date().getFullYear()} QualityModule. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-stone-500 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-primary font-medium">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
