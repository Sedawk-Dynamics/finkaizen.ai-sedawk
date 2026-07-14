import Link from 'next/link';

export type FootLink = { href: string; label: string; external?: boolean };

function renderLink(l: FootLink) {
  if (l.external) {
    return (
      <a href={l.href}>{l.label}</a>
    );
  }
  return <Link href={l.href}>{l.label}</Link>;
}

export default function Footer({
  products,
  company,
}: {
  products: FootLink[];
  company: FootLink[];
}) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand">
              <img src="/FInkaizan%20png.png" alt="Finkaizen" className="brand-logo" />
            </div>
            <p className="addr">
              House No. 186, Silezari Tah, Arjuni/Mor,
              <br />
              Dist. Gondia, Bondgaon Devi, Gondia,
              <br />
              Arjuni Morgaon, Maharashtra, India, 441701
            </p>
            <div className="contact-line pri">+91 9175797339</div>
            <div className="contact-line">info@finkaizenai.com</div>
            <div className="social">
              <a
                href="https://www.instagram.com/finkaizen.ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Finkaizen on Instagram"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://x.com/finkaizenai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Finkaizen on X"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18.9 2H22l-7.4 8.5L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.9-9L1 2h7l4.8 6.4L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61592039120618"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Finkaizen on Facebook"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/finkaizen-ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Finkaizen on LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9Z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              {products.map((l, i) => (
                <li key={i}>{renderLink(l)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              {company.map((l, i) => (
                <li key={i}>{renderLink(l)}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>
            © <span data-year=""></span> Finkaizen Analytics. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/security">Security</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
