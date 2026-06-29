import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Leadership · Finkaizen',
  description: 'Meet the founders and leadership of Finkaizen.',
};

export default function LeadershipPage() {
  return (
    <>
      <header className="phead">
        <div className="grid-bg"></div>
        <div className="wrap">
          <div className="crumb">
            FINKAIZEN <span>/</span> LEADERSHIP
          </div>
          <div className="eyebrow">The Architects</div>
          <h1>Founders building the trust layer of AI in banking.</h1>
          <p>
            Deep expertise in financial systems and applied machine learning — committed to shipping models that are
            accurate, explainable and aligned to real business outcomes.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="lead-grid">
            <div className="card reveal" style={{ padding: '48px' }}>
              <div className="leader" style={{ marginBottom: '32px' }}>
                <div className="avatar" style={{ width: '120px', height: '120px', fontSize: '32px' }}>
                  SS
                </div>
                <div>
                  <h3 style={{ fontSize: '24px' }}>Shankar Shahare</h3>
                  <p className="role">FOUNDER · CHIEF EXECUTIVE</p>
                </div>
              </div>
              <p className="muted" style={{ lineHeight: '1.7' }}>
                Shankar leads Finkaizen&apos;s product and engineering direction. He sets the bar for model quality,
                explainability and the way analytics translate into measurable outcomes for lenders. He champions the
                conviction that production AI is judged by business impact — not benchmark scores.
              </p>
            </div>

            <div className="card reveal" style={{ padding: '48px' }}>
              <div className="leader" style={{ marginBottom: '32px' }}>
                <div className="avatar" style={{ width: '120px', height: '120px', fontSize: '32px' }}>
                  SS
                </div>
                <div>
                  <h3 style={{ fontSize: '24px' }}>Sanghmitra Shahare</h3>
                  <p className="role">CO-FOUNDER · DIRECTOR</p>
                </div>
              </div>
              <p className="muted" style={{ lineHeight: '1.7' }}>
                Sanghmitra directs organisational scale, delivery operations and the compliance posture that
                institutional clients require. She ensures every engagement runs with the documentation, reproducibility
                and governance that regulated environments demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-tight"
        style={{ borderTop: '1px solid var(--border)', background: 'hsla(0,0%,100%,0.015)' }}
      >
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Operating Principles</div>
              <h2 className="h2">How leadership runs the company</h2>
            </div>
          </div>
          <div className="bento">
            <div className="bcard reveal">
              <h3>Ownership over titles</h3>
              <p>Engineers and analysts own outcomes end-to-end. Titles describe scope, not gatekeeping.</p>
            </div>
            <div className="bcard reveal">
              <h3>Documented decisions</h3>
              <p>Every model choice has a written rationale. Reproducibility is a delivery requirement.</p>
            </div>
            <div className="bcard reveal">
              <h3>Risk-first engineering</h3>
              <p>Validation, monitoring and rollback paths ship with every model, not after.</p>
            </div>
            <div className="bcard reveal">
              <h3>Mentor-led growth</h3>
              <p>Senior engineers commit hours per week to mentoring associates and interns.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="grid-bg"></div>
        <div className="wrap">
          <h2>Want to work directly with the founders?</h2>
          <Link href="/contact" className="btn btn-primary">
            Reach Out →
          </Link>
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
