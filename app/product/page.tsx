import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Products · Finkaizen',
  description: 'Eight production-grade AI modules for credit, collections and risk — built by Finkaizen.',
};

export default function ProductPage() {
  return (
    <>
      <header className="phead">
        <div className="grid-bg"></div>
        <div className="wrap">
          <div className="crumb">
            FINKAIZEN <span>/</span> PRODUCTS
          </div>
          <div className="eyebrow">The FINKAIZEN.AI Product Suite</div>
          <h1>Eight modules for the full credit lifecycle.</h1>
          <p>
            From onboarding and underwriting to early warning and recovery — each module is built to deploy in
            production environments with explainability, monitoring and compliance baked in.
          </p>
        </div>
      </header>

      {/* Featured / Bento */}
      <section className="section">
        <div className="wrap">
          <div className="bento">
            <div className="bcard lg reveal" id="app" data-module="app">
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
            <div className="bcard reveal" id="beh" data-module="beh">
              <div className="mod">MOD · BEH</div>
              <h3>Behavioural Scorecard</h3>
              <p>Dynamic monitoring of existing portfolios — predicts delinquency patterns before they materialise.</p>
            </div>
            <div className="bcard reveal" id="stmt" data-module="stmt">
              <div className="mod">MOD · STMT</div>
              <h3>Bank Statement Analyser</h3>
              <p>OCR and AI-driven parsing of multi-bank statements with cash-flow analysis and red-flag detection.</p>
            </div>
            <div className="bcard reveal" id="bureau" data-module="bureau">
              <div className="mod">MOD · BUR</div>
              <h3>Bureau Report Analyser</h3>
              <p>Automated synthesis across multiple bureaus into a unified, actionable risk view.</p>
            </div>
            <div className="bcard reveal" id="prof" data-module="prof">
              <div className="mod">MOD · PRO</div>
              <h3>Propensity API</h3>
              <p>
                ML-driven scores that predict each customer&apos;s likelihood to buy specific banking products for
                smarter cross-sell decisions.
              </p>
            </div>
            <div className="bcard wide reveal" id="ews" data-module="ews">
              <div className="mod">MOD · EWS</div>
              <h3>Early Warning System</h3>
              <p>Real-time ML alerts that predict and prevent credit, fraud, and operational risks for collection teams.</p>
              <div className="badges">
                <span className="badge crit">Critical</span>
                <span className="badge">v2.4</span>
                <span className="badge">Audit-Ready</span>
              </div>
            </div>
            <div className="bcard reveal" id="rec" data-module="rec">
              <div className="mod">MOD · REC</div>
              <h3>90+DPD Recovery AI Services</h3>
              <p>Propensity-to-pay modelling to prioritise queues and optimise collection strategy.</p>
            </div>
            <div className="bcard reveal" id="pd" data-module="pd">
              <div className="mod">MOD · PD</div>
              <h3>PD AI Services</h3>
              <p>Statistical modelling of long-term Probability of Default for provisioning and capital planning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spec list */}
      <section className="section-tight" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Spec Sheet</div>
              <h2 className="h2">All modules at a glance</h2>
            </div>
          </div>
          <div className="prodlist reveal">
            <div className="row">
              <div className="num">01</div>
              <div className="name">Application Scorecard</div>
              <div className="desc">Underwriting decisions in &lt; 50ms with explainable feature attribution.</div>
              <div className="stat">Live</div>
            </div>
            <div className="row">
              <div className="num">02</div>
              <div className="name">Behavioural Scorecard</div>
              <div className="desc">Portfolio-wide behavioural risk refresh, daily or on-demand.</div>
              <div className="stat">Live</div>
            </div>
            <div className="row">
              <div className="num">03</div>
              <div className="name">Bank Statement Analyser</div>
              <div className="desc">300+ Indian bank formats, multi-page OCR, transaction categorisation.</div>
              <div className="stat">Live</div>
            </div>
            <div className="row">
              <div className="num">04</div>
              <div className="name">Bureau Report Analyser</div>
              <div className="desc">Cross-bureau parsing into a unified risk and tradeline view.</div>
              <div className="stat">Live</div>
            </div>
            <div className="row">
              <div className="num">05</div>
              <div className="name">Proficiency API</div>
              <div className="desc">REST + batch endpoints for KYC, verification and signal enrichment.</div>
              <div className="stat">Live</div>
            </div>
            <div className="row">
              <div className="num">06</div>
              <div className="name">Early Warning System · 90+ DPD</div>
              <div className="desc">Predictive delinquency surfacing with prescribed interventions.</div>
              <div className="stat">Live</div>
            </div>
            <div className="row">
              <div className="num">07</div>
              <div className="name">Recovery AI Services</div>
              <div className="desc">Propensity-to-pay scoring + recommended channel and timing.</div>
              <div className="stat">Live</div>
            </div>
            <div className="row">
              <div className="num">08</div>
              <div className="name">Probability of Default · AI Services</div>
              <div className="desc">PD modelling for IFRS-9 / ECL provisioning and capital planning.</div>
              <div className="stat">Live</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="grid-bg"></div>
        <div className="wrap">
          <h2>See any of these modules in your environment.</h2>
          <Link href="/contact" className="btn btn-primary">
            Book a Demo →
          </Link>
        </div>
      </section>

      <Footer
        products={[
          { href: '/products#app', label: 'Application Scorecard' },
          { href: '/products#stmt', label: 'Statement Analyser' },
          { href: '/products#ews', label: 'Early Warning System' },
          { href: '/products#pd', label: 'PD AI Services' },
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
