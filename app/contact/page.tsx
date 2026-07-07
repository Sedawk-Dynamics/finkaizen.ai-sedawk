import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact · Finkaizen',
  description: 'Talk to the Finkaizen team about deploying AI in your credit stack.',
};

export default function ContactPage() {
  return (
    <>
      <header className="phead">
        <div className="grid-bg"></div>
        <div className="wrap">
          <div className="crumb">
            FINKAIZEN <span>/</span> CONTACT
          </div>
          <div className="eyebrow">Initiate Contact</div>
          <h1>Let&apos;s deploy intelligence in your stack.</h1>
          <p>
            Send us a brief about your environment and the problem you want to solve. We&apos;ll respond within one
            business day.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap contact-grid">
          <div className="contact-info reveal">
            <div className="iblock">
              <div className="iicon">@</div>
              <div>
                <div className="ilabel">Email</div>
                <div className="ival">
                  <a href="mailto:info@finkaizenai.com">info@finkaizenai.com</a>
                </div>
              </div>
            </div>
            <div className="iblock">
              <div className="iicon">☎</div>
              <div>
                <div className="ilabel">Phone</div>
                <div className="ival">
                  <a href="tel:+919175797339">+91 91757 97339</a>
                </div>
              </div>
            </div>
            <div className="iblock">
              <div className="iicon">⌖</div>
              <div>
                <div className="ilabel">Headquarters</div>
                <div className="ival">
                  House No. 186, Silezari Tah, Arjuni/Mor
                  <br />
                  Dist. Gondia, Bondgaon Devi, Gondia
                  <br />
                  Arjuni Morgaon, Maharashtra, India, 441701
                </div>
                <div className="ival" style={{ marginTop: '8px' }}>
                  <a
                    href="https://maps.app.goo.gl/YifPBvx73yZY7zt77"
                    target="_blank"
                    rel="noopener"
                    style={{
                      color: 'var(--primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                    }}
                  >
                    Open in Maps →
                  </a>
                </div>
              </div>
            </div>
            <div className="iblock" style={{ borderBottom: 'none' }}>
              <div className="iicon">⌛</div>
              <div>
                <div className="ilabel">Hours</div>
                <div className="ival">Mon — Sat, 10:00 — 19:00 IST</div>
              </div>
            </div>

            <iframe
              className="map-embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Finkaizen Headquarters"
              src="https://www.google.com/maps?q=20.925046,79.974951&hl=en&z=15&output=embed"
            ></iframe>
          </div>

          <form className="form reveal" id="contactForm" noValidate>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Full name" autoComplete="name" />
                <div className="err">Name is required</div>
              </div>
              <div className="field">
                <label htmlFor="institution">Institution</label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  placeholder="Bank / NBFC / Company"
                  autoComplete="organization"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@institution.com" autoComplete="email" />
                <div className="err">Valid email required</div>
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="+91 ..." autoComplete="tel" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="interest">Module of interest</label>
              <select id="interest" name="interest" defaultValue="">
                <option value="">Select a module —</option>
                <option>Application Scorecard</option>
                <option>Behavioural Scorecard</option>
                <option>Bank Statement Analyser</option>
                <option>Bureau Report Analyser</option>
                <option>Proficiency API</option>
                <option>Early Warning System · 90+ DPD</option>
                <option>Recovery AI Services</option>
                <option>PD AI Services</option>
                <option>Custom / Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your environment and what you'd like to solve."
              ></textarea>
              <div className="err">Message is required</div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              Send Inquiry →
            </button>
            <p
              className="muted"
              style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}
            >
              By submitting, you agree to be contacted by the Finkaizen team. We never share data with third parties.
            </p>
          </form>
        </div>
      </section>

      <div className="toast" id="toast">
        Inquiry queued — opening your mail client
      </div>

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
