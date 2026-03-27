"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Shield, Database, Eye, Lock, Globe, Cookie, UserX, Bell, Mail, ChevronDown } from "lucide-react";
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

function InfoCard({ icon: Icon, title, value }: { icon: React.ElementType; title: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-stone-200">
      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-xs text-stone-400">{title}</p>
        <p className="text-sm font-semibold text-stone-800">{value}</p>
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl">
            How we collect, use, and protect your data. Your privacy matters &mdash; here&apos;s everything you need to know.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              <Shield className="w-3 h-3" /> SOC 2 Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              <Lock className="w-3 h-3" /> AES-256 Encryption
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

          {/* 1. Introduction */}
          <Section icon={Shield} number="1" title="Introduction" defaultOpen={true}>
            <P>
              QualityModule (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our digital quality management platform, including our web application, mobile applications, and related services (collectively, the &quot;Service&quot;).
            </P>
            <P>
              By accessing or using QualityModule, you agree to this Privacy Policy. If you do not agree, please do not use the Service.
            </P>
          </Section>

          {/* 2. Information We Collect */}
          <Section icon={Database} number="2" title="Information We Collect" defaultOpen={true}>
            <SubSection number="2.1" title="Information You Provide">
              <UL>
                <LI label="Account Information">Name, email address, phone number, job title, company name, and role when you register or are invited to a workspace.</LI>
                <LI label="Inspection &amp; Checklist Data">Responses, signatures, photos, timestamps, GPS coordinates, and comments submitted through checklists and inspections.</LI>
                <LI label="Snag Reports">Defect descriptions, images, assigned personnel, resolution notes, and status updates.</LI>
                <LI label="Communication Data">Messages, feedback, and support requests you send to us.</LI>
              </UL>
            </SubSection>

            <SubSection number="2.2" title="Information Collected Automatically">
              <UL>
                <LI label="Device Information">Device type, operating system, browser type, and unique device identifiers.</LI>
                <LI label="Usage Data">Pages visited, features used, time spent, click patterns, and interaction data.</LI>
                <LI label="Log Data">IP address, access times, referring URLs, and error logs.</LI>
                <LI label="Location Data">Approximate location from IP address; precise GPS location only when you explicitly enable it for site-based inspections.</LI>
              </UL>
            </SubSection>

            <SubSection number="2.3" title="Information from Third Parties">
              <UL>
                <LI label="Workspace Administrators">Your organization&apos;s admin may provide your details when adding you to a workspace.</LI>
                <LI label="Integration Partners">Data from connected tools (e.g., project management software, ERP systems) as configured by your organization.</LI>
              </UL>
            </SubSection>
          </Section>

          {/* 3. How We Use Your Information */}
          <Section icon={Eye} number="3" title="How We Use Your Information">
            <P>We use collected information to:</P>
            <UL>
              <LI>Provide, maintain, and improve the QualityModule platform.</LI>
              <LI>Process inspection submissions, manage approval workflows, and generate audit trails.</LI>
              <LI>Enable collaboration between team members, inspectors, and stakeholders.</LI>
              <LI>Generate reports, analytics, and compliance documentation.</LI>
              <LI>Send service notifications, updates, and security alerts.</LI>
              <LI>Provide customer support and respond to inquiries.</LI>
              <LI>Detect, prevent, and address technical issues and security threats.</LI>
              <LI>Comply with legal obligations and enforce our terms.</LI>
            </UL>
          </Section>

          {/* 4. Data Sharing */}
          <Section icon={Globe} number="4" title="Data Sharing &amp; Disclosure">
            <P>We do not sell your personal data. We may share information with:</P>
            <UL>
              <LI label="Your Organization">Workspace administrators and authorized team members within your organization can access project-related data.</LI>
              <LI label="Service Providers">Trusted third parties who assist with hosting, analytics, email delivery, and customer support, bound by confidentiality agreements.</LI>
              <LI label="Legal Requirements">When required by law, court order, or governmental authority.</LI>
              <LI label="Business Transfers">In connection with a merger, acquisition, or sale of assets, with prior notice.</LI>
            </UL>
          </Section>

          {/* 5. Data Security */}
          <Section icon={Lock} number="5" title="Data Security">
            <P>We implement industry-standard security measures to protect your data, including:</P>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <InfoCard icon={Lock} title="Encryption" value="TLS 1.2+ in transit, AES-256 at rest" />
              <InfoCard icon={Shield} title="Access Control" value="Role-based with MFA" />
              <InfoCard icon={Eye} title="Auditing" value="Regular security audits & pen testing" />
              <InfoCard icon={Database} title="Backups" value="Geo-redundant automated backups" />
            </div>
            <P>
              While we strive to protect your data, no method of transmission or storage is 100% secure. We cannot guarantee absolute security.
            </P>
          </Section>

          {/* 6. Data Retention */}
          <Section icon={Database} number="6" title="Data Retention">
            <P>
              We retain your data for as long as your account is active or as needed to provide the Service. Inspection records and audit trails are retained per your organization&apos;s configured retention policy (default: 7 years for compliance purposes). You may request data deletion subject to legal retention requirements.
            </P>
            <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-lg">
              <p className="text-sm font-semibold text-primary">Default Retention Period</p>
              <p className="text-2xl font-bold text-stone-900 mt-1">7 Years</p>
              <p className="text-xs text-stone-500 mt-1">For inspection records &amp; audit trails (configurable per organization)</p>
            </div>
          </Section>

          {/* 7. Your Rights */}
          <Section icon={UserX} number="7" title="Your Rights">
            <P>Depending on your jurisdiction, you may have the right to:</P>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {[
                { title: "Access", desc: "Your personal data we hold" },
                { title: "Correct", desc: "Inaccurate or incomplete data" },
                { title: "Delete", desc: "Your personal data" },
                { title: "Export", desc: "Your data in a portable format" },
                { title: "Restrict", desc: "Certain processing activities" },
                { title: "Withdraw", desc: "Consent-based processing" },
              ].map((right) => (
                <div key={right.title} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-stone-200">
                  <span className="text-primary font-bold text-sm mt-0.5">&#10003;</span>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{right.title}</p>
                    <p className="text-xs text-stone-500">{right.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <P>
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@qualitymodule.com" className="text-primary font-medium hover:underline">privacy@qualitymodule.com</a>.
            </P>
          </Section>

          {/* 8. International Data Transfers */}
          <Section icon={Globe} number="8" title="International Data Transfers">
            <P>
              Your data may be processed in countries other than your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission, where applicable.
            </P>
          </Section>

          {/* 9. Cookies */}
          <Section icon={Cookie} number="9" title="Cookies &amp; Tracking">
            <P>
              We use essential cookies for authentication and session management. We use analytics cookies (with your consent where required) to understand usage patterns and improve the Service. You can manage cookie preferences through your browser settings.
            </P>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-white border border-stone-200">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wide">Essential</p>
                <p className="text-sm text-stone-700 mt-1">Authentication &amp; session management</p>
                <span className="inline-block mt-2 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">Always Active</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-stone-200">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wide">Analytics</p>
                <p className="text-sm text-stone-700 mt-1">Usage patterns &amp; service improvement</p>
                <span className="inline-block mt-2 text-xs font-medium bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">Consent Required</span>
              </div>
            </div>
          </Section>

          {/* 10. Children's Privacy */}
          <Section icon={UserX} number="10" title="Children&apos;s Privacy">
            <P>
              QualityModule is designed for professional use and is not intended for individuals under 16. We do not knowingly collect data from children.
            </P>
          </Section>

          {/* 11. Changes */}
          <Section icon={Bell} number="11" title="Changes to This Policy">
            <P>
              We may update this Privacy Policy periodically. We will notify you of material changes via email or an in-app notice at least 30 days before changes take effect. Continued use after changes constitutes acceptance.
            </P>
          </Section>

          {/* 12. Contact */}
          <Section icon={Mail} number="12" title="Contact Us" defaultOpen={true}>
            <P>If you have questions about this Privacy Policy or our data practices, contact us at:</P>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <a href="mailto:privacy@qualitymodule.com" className="flex items-center gap-3 p-4 rounded-lg bg-white border border-stone-200 hover:border-primary/30 hover:bg-primary/5 transition-colors group">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-stone-400">Email</p>
                  <p className="text-sm font-semibold text-stone-800 group-hover:text-primary transition-colors">privacy@qualitymodule.com</p>
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
            <Link href="/privacy" className="text-xs text-primary font-medium">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-stone-500 hover:text-primary transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
