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
