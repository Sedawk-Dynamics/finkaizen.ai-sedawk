import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Security · Finkaizen',
  description: 'How Finkaizen protects data and builds security into every model and service.',
};

export default function SecurityPage() {
  return (
    <>
      <header className="phead">
        <div className="grid-bg"></div>
        <div className="wrap">
          <div className="crumb">
            FINKAIZEN <span>/</span> SECURITY
          </div>
          <div className="eyebrow">Trust &amp; Security</div>
          <h1>Security is built in, not bolted on.</h1>
          <p>
            We work with regulated financial institutions, so security and compliance are baseline requirements across
            everything we build — from data ingestion to model deployment.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Our Approach</div>
              <h2 className="h2">How we protect your data</h2>
            </div>
          </div>
          <div className="bento">
            <div className="bcard reveal">
              <h3>Encryption</h3>
              <p>Data is encrypted in transit (TLS) and at rest using industry-standard algorithms.</p>
            </div>
            <div className="bcard reveal">
              <h3>Access control</h3>
              <p>Least-privilege access, role-based permissions and audit logging on sensitive systems.</p>
            </div>
            <div className="bcard reveal">
              <h3>Data minimisation</h3>
              <p>We collect only what is required and retain it only for as long as necessary.</p>
            </div>
            <div className="bcard reveal">
              <h3>Monitoring</h3>
              <p>Continuous monitoring for anomalies, with alerting and defined incident-response paths.</p>
            </div>
            <div className="bcard reveal">
              <h3>Model governance</h3>
              <p>Validation, versioning, monitoring and rollback ship with every model — not after.</p>
            </div>
            <div className="bcard reveal">
              <h3>Compliance-ready</h3>
              <p>Documentation and reproducibility designed for the governance regulated environments demand.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="wrap two-col">
          <div className="prose reveal">
            <h2>Reporting a vulnerability</h2>
            <p>
              If you believe you have found a security vulnerability, please report it responsibly to{' '}
              <a href="mailto:info@finkaizenai.com">info@finkaizenai.com</a>. We will acknowledge your report and work
              with you on a resolution. Please do not publicly disclose the issue until it has been addressed.
            </p>
          </div>
        </div>
      </section>

      <Footer
        products={[{ href: '/products', label: 'All Modules' }]}
        company={[
          { href: '/about', label: 'About' },
          { href: '/leadership', label: 'Leadership' },
          { href: '/contact', label: 'Contact' },
        ]}
      />
    </>
  );
}
