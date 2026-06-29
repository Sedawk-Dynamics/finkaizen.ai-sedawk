import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About · Finkaizen',
  description: 'Finkaizen builds practical, explainable AI for financial institutions and consumers.',
};

export default function AboutPage() {
  return (
    <>
      <header className="phead">
        <div className="grid-bg"></div>
        <div className="wrap">
          <div className="crumb">
            FINKAIZEN <span>/</span> ABOUT
          </div>
          <div className="eyebrow">Who we are</div>
          <h1>We build practical AI that earns trust at the institutional level.</h1>
          <p>
            We combine deep domain knowledge in banking with robust data science and engineering to deliver
            production-ready solutions that are accurate, explainable, and focused on measurable business impact.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap two-col">
          <div className="prose reveal">
            <div className="eyebrow">Our Story</div>
            <h2>From hypothesis to validated outcomes — fast.</h2>
            <p>
              Finkaizen was founded with a single conviction: AI in banking should be measured by business impact, not
              technical novelty. Our teams move quickly from hypothesis to validated outcomes while maintaining strong
              controls around model quality, fairness and compliance.
            </p>
            <p>
              We work with financial institutions and consumers on the same problem from two sides — better data, better
              decisions, fewer surprises.
            </p>

            <h2>What we do</h2>
            <ul>
              <li>Develop scoring and risk models — scorecards, probability-of-default and early-warning systems.</li>
              <li>Build data ingestion and statement analysis tools that automate underwriting and collections.</li>
              <li>Create personal-assistant AI for finance, health and scheduling.</li>
              <li>Deliver end-to-end: data engineering, feature engineering, model building, validation and deployment.</li>
            </ul>
          </div>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card">
              <div className="eyebrow">Mission</div>
              <p>
                To empower financial organisations and individuals with trustworthy AI and analytics that improve
                outcomes, reduce risk, and enable smarter financial decisions.
              </p>
            </div>
            <div className="card">
              <div className="eyebrow">Vision</div>
              <p>
                To be the trusted partner for applying practical, transparent AI across lending, collections, and
                personal finance — delivering continuous improvement and clear business value.
              </p>
            </div>
            <div className="card">
              <div className="eyebrow">Why students should join</div>
              <p>
                Hands-on experience building models used in real business processes. Exposure to the full ML lifecycle —
                pipelines, deployment and monitoring. Mentorship from engineers and domain experts, with real ownership
                of features and deliverables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AVIANT VALUES — expanded */}
      <section
        className="section-tight"
        style={{ borderTop: '1px solid var(--border)', background: 'hsla(0,0%,100%,0.015)' }}
      >
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Core Values</div>
              <h2 className="h2">A · V · I · A · N · T</h2>
              <p className="section-sub">The six commitments that shape how we work and what we ship.</p>
            </div>
          </div>
          <div className="bento">
            <div className="bcard reveal">
              <div className="mod">01</div>
              <h3>Accurate</h3>
              <p>
                We prioritise data integrity and model precision. Decisions must be grounded in reliable inputs and
                validated outputs.
              </p>
            </div>
            <div className="bcard reveal">
              <div className="mod">02</div>
              <h3>Vigilant</h3>
              <p>
                We actively monitor risk, bias and compliance. Early detection and remediation of issues is a baseline
                requirement.
              </p>
            </div>
            <div className="bcard reveal">
              <div className="mod">03</div>
              <h3>Improvement</h3>
              <p>
                Continuous improvement (Kaizen) is central — experiments, retrospectives and incremental gains compound
                into lasting progress.
              </p>
            </div>
            <div className="bcard reveal">
              <div className="mod">04</div>
              <h3>Aligned</h3>
              <p>
                Our work is client-value oriented. Solutions are designed to meet stakeholders&apos; business goals, not
                just technical elegance.
              </p>
            </div>
            <div className="bcard reveal">
              <div className="mod">05</div>
              <h3>Nimble</h3>
              <p>We favour rapid experimentation and pragmatic delivery to learn quickly and bring value sooner.</p>
            </div>
            <div className="bcard reveal">
              <div className="mod">06</div>
              <h3>Transparent</h3>
              <p>
                Clear communication, documentation and reproducibility are non-negotiable. Stakeholders should
                understand how models work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Culture</div>
              <h2 className="h2">How we work</h2>
            </div>
          </div>
          <div className="bento">
            <div className="bcard reveal">
              <h3>Product-minded</h3>
              <p>We measure success by business impact and user value, not lines of code shipped.</p>
            </div>
            <div className="bcard reveal">
              <h3>Collaborative</h3>
              <p>Cross-functional teams with clear ownership and frequent feedback loops.</p>
            </div>
            <div className="bcard reveal">
              <h3>Experiment-driven</h3>
              <p>Rapid prototyping. Learn fast, iterate, kill what doesn&apos;t work.</p>
            </div>
            <div className="bcard reveal">
              <h3>Responsible</h3>
              <p>Emphasis on model explainability, fairness and regulatory compliance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="grid-bg"></div>
        <div className="wrap">
          <h2>Want to build with us — or hire us?</h2>
          <Link href="/contact" className="btn btn-primary">
            Get in Touch →
          </Link>
        </div>
      </section>

      <Footer
        products={[
          { href: '/products', label: 'Application Scorecard' },
          { href: '/products', label: 'Behavioural Scorecard' },
          { href: '/products', label: 'Statement Analyser' },
          { href: '/products', label: 'Bureau Analyser' },
        ]}
        company={[
          { href: '/about', label: 'About' },
          { href: '/leadership', label: 'Leadership' },
          { href: '/contact', label: 'Contact' },
        ]}
      />
    </>
  );
}
