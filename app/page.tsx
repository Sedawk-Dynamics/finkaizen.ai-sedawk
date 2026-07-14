import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Finkaizen — Engineered Intelligence for Kaizen',
  description:
    'Finkaizen builds practical AI and analytics for banks and NBFCs — scorecards, statement analysis, early warning, recovery and PD AI services.',
  openGraph: {
    title: 'Finkaizen — Engineered Intelligence for Kaizen',
    description: 'AI and analytics for credit risk, collections and personal finance.',
    type: 'website',
  }, 
};

export default function IndexPage() {
  return (
    <>
      {/* HERO */}
      <header className="hero">
        <div className="hero-bg">
          <div className="grid-bg"></div>
          <div className="scan"></div>
        </div>
        <div className="wrap hero-content">
          <div className="tag">
            <span className="tag-dot"></span>System Status: Optimal
          </div>
          <h1 className="h1">
            ENGINEERED <em>INTELLIGENCE</em> FOR KAIZEN.
          </h1>
          <p className="kaizen-line">
            // Continuously improving your business — one decision, one model, one basis point at a time.
          </p>
          <p className="lead">
            Finkaizen delivers production-grade AI and analytics to banks and NBFCs — transforming raw financial data
            into predictive credit risk instruments, recovery strategies and personal-finance assistance.
          </p>
          <div className="cta-row">
            <Link href="/products" className="btn btn-primary">
              Explore Product Suite →
            </Link>
            <Link href="/about" className="btn btn-ghost">
              Why Finkaizen
            </Link>
          </div>
        </div>
      </header>

      {/* VALUES BAND */}
      <section className="values">
        <div className="wrap">
          <div className="values-grid">
            <div>
              <span className="vnum">01</span>
              <span className="vname">Accurate</span>
              <span className="vdesc">Data integrity and model precision.</span>
            </div>
            <div>
              <span className="vnum">02</span>
              <span className="vname">Vigilant</span>
              <span className="vdesc">Active monitoring of risk, bias and compliance.</span>
            </div>
            <div>
              <span className="vnum">03</span>
              <span className="vname">Improvement</span>
              <span className="vdesc">Kaizen — continuous incremental gains.</span>
            </div>
            <div>
              <span className="vnum">04</span>
              <span className="vname">Aligned</span>
              <span className="vdesc">Solutions tied to client business goals.</span>
            </div>
            <div>
              <span className="vnum">05</span>
              <span className="vname">Nimble</span>
              <span className="vdesc">Rapid experimentation, pragmatic delivery.</span>
            </div>
            <div>
              <span className="vnum">06</span>
              <span className="vname">Transparent</span>
              <span className="vdesc">Clear communication and reproducibility.</span>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO PRODUCTS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Product Suite</div>
              <h2 className="h2">Core Infrastructure</h2>
              <p className="section-sub">Eight modular units engineered for every stage of the credit lifecycle.</p>
            </div>
            <Link href="/products" className="btn btn-ghost">
              View All →
            </Link>
          </div>

          <div className="bento">
            <div className="bcard lg reveal" data-module="app">
              <div className="mod">MOD · APP_SCORE</div>
              <h3>Application Scorecard</h3>
              <p>
                Real-time creditworthiness scoring at the moment of application. Combines bureau, behavioural and
                alternative data into an explainable decision with feature attribution.
              </p>
              <div className="viz">
                <div className="viz-grid"></div>
                <div className="viz-line"></div>
              </div>
            </div>
            <div className="bcard reveal" data-module="beh">
              <div className="mod">MOD · BEH</div>
              <h3>Behavioural Scorecard</h3>
              <p>Dynamic monitoring of existing portfolios — predicts delinquency patterns before they materialise.</p>
            </div>
            <div className="bcard reveal" data-module="stmt">
              <div className="mod">MOD · STMT</div>
              <h3>Bank Statement Analyser</h3>
              <p>OCR and AI-driven parsing of multi-bank statements with cash-flow analysis and red-flag detection.</p>
            </div>
            <div className="bcard reveal" data-module="bureau">
              <div className="mod">MOD · BUR</div>
              <h3>Bureau Report Analyser</h3>
              <p>Automated synthesis across multiple bureaus into a unified, actionable risk view.</p>
            </div>
            <div className="bcard reveal" data-module="prof">
              <div className="mod">MOD · PRO</div>
              <h3>Loan Propensity API</h3>
              <p>
                ML-driven scores that predict each customer&apos;s likelihood to buy specific banking products for
                smarter cross-sell decisions.
              </p>
            </div>
            <div className="bcard wide reveal" data-module="ews">
              <div className="mod">MOD · EWS</div>
              <h3>Early Warning System</h3>
              <p>Real-time ML alerts that predict and prevent credit, fraud, and operational risks for collection teams.</p>
              <div className="badges">
                <span className="badge crit">Critical</span>
                <span className="badge">v2.4</span>
                <span className="badge">Audit-Ready</span>
              </div>
            </div>
            <div className="bcard reveal" data-module="rec">
              <div className="mod">MOD · REC</div>
              <h3>90+DPD Recovery AI Services</h3>
              <p>Propensity-to-pay modelling to prioritise queues and optimise collection strategy.</p>
            </div>
            <div className="bcard reveal" data-module="pd">
              <div className="mod">MOD · PD</div>
              <h3>PD AI Services</h3>
              <p>Statistical modelling of long-term Probability of Default for provisioning and capital planning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="metrics">
        <div className="wrap metrics-grid">
          <div className="reveal">
            <div className="metric-num">
              <span className="count" data-to="99.8" data-suffix="%" data-decimals="1">
                0%
              </span>
            </div>
            <div className="metric-lab">OCR Accuracy</div>
          </div>
          <div className="reveal">
            <div className="metric-num">
              <span className="count" data-to="12" data-suffix="ms">
                0ms
              </span>
            </div>
            <div className="metric-lab">API Latency</div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">About</div>
              <h2 className="h2">Practical AI that earns institutional trust.</h2>
              <p className="section-sub">
                We pair deep banking domain knowledge with robust data science and engineering to ship models that are
                accurate, explainable and measured by business impact — not benchmark scores.
              </p>
            </div>
            <Link href="/about" className="btn btn-ghost">
              About Finkaizen →
            </Link>
          </div>

          <div className="bento">
            <div className="bcard reveal">
              <h3>Risk &amp; Scoring Models</h3>
              <p>Scorecards, probability-of-default and early-warning systems built for real lending decisions.</p>
            </div>
            <div className="bcard reveal">
              <h3>Data &amp; Statement Analysis</h3>
              <p>Ingestion and statement-parsing tools that automate underwriting and collections at scale.</p>
            </div>
            <div className="bcard reveal">
              <h3>Business Intelligence</h3>
              <p>Interactive dashboards and real-time insights that turn raw data into smarter decisions.</p>
            </div>
            <div className="bcard reveal">
              <h3>Data Science &amp; Analytics</h3>
              <p>AI, machine learning and predictive analytics that solve complex business challenges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP PREVIEW + MISSION */}
      <section className="section">
        <div className="wrap">
          <div className="lead-grid">
            <div className="reveal">
              <div className="eyebrow">Leadership</div>
              <h2 className="h2" style={{ marginBottom: '48px' }}>
                The Architects
              </h2>
              <div className="lead-list">
                <div className="leader">
                  <div className="avatar">SS</div>
                  <div>
                    <h3>Shankar Shahare</h3>
                    <p className="role">FOUNDER · CHIEF EXECUTIVE</p>
                    <p>Leading the vision for algorithmic risk parity and pragmatic AI in modern banking.</p>
                  </div>
                </div>
                <div className="leader">
                  <div className="avatar">SS</div>
                  <div>
                    <h3>Sanghmitra Shahare</h3>
                    <p className="role">CO-FOUNDER · DIRECTOR</p>
                    <p>Directing organisational scale, delivery operations and institutional compliance frameworks.</p>
                  </div>
                </div>
              </div>
              <Link href="/leadership" className="btn btn-ghost" style={{ marginTop: '32px' }}>
                Meet the Leadership →
              </Link>
            </div>

            <div className="mission-card reveal">
              <div className="eyebrow" style={{ color: 'var(--primary)' }}>
                Mission
              </div>
              <p className="quote">
                &quot;To empower financial organisations and individuals with trustworthy AI and analytics that improve
                outcomes, reduce risk, and enable smarter financial decisions.&quot;
              </p>
              <div className="div"></div>
              <div className="eyebrow" style={{ color: 'var(--primary)' }}>
                Vision
              </div>
              <p className="muted" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                To be the trusted partner for applying practical, transparent AI across lending, collections and
                personal finance — delivering continuous improvement and clear business value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="grid-bg"></div>
        <div className="wrap">
          <h2>Ready to deploy explainable AI in your credit stack?</h2>
          <Link href="/contact" className="btn btn-primary">
            Start a Conversation →
          </Link>
        </div>
      </section>

      <Footer
        products={[
          { href: '/products#app', label: 'Application Scorecard' },
          { href: '/products#beh', label: 'Behavioural Scorecard' },
          { href: '/products#stmt', label: 'Statement Analyser' },
          { href: '/products#bureau', label: 'Bureau Analyser' },
          { href: '/products#ews', label: 'Early Warning System' },
        ]}
        company={[
          { href: '/about', label: 'About' },
          { href: '/leadership', label: 'Leadership' },
          { href: '/contact', label: 'Contact' },
          { href: 'mailto:info@finkaizenai.com', label: 'info@finkaizenai.com', external: true },
        ]}
      />
    </>
  );
}
