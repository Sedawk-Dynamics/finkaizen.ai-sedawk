import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Use · Finkaizen',
  description: 'The terms that govern your use of the Finkaizen website.',
};

export default function TermsPage() {
  return (
    <>
      <header className="phead">
        <div className="grid-bg"></div>
        <div className="wrap">
          <div className="crumb">
            FINKAIZEN <span>/</span> TERMS
          </div>
          <div className="eyebrow">Legal</div>
          <h1>Terms of Use</h1>
          <p>
            By accessing and using this website, you agree to these terms. Please read them carefully. If you do not
            agree, please do not use the site.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap two-col">
          <div className="prose reveal">
            <h2>Use of the site</h2>
            <p>
              This website and its content are provided for general information about Finkaizen and its products. You
              agree to use the site lawfully and not to disrupt, damage or gain unauthorised access to it.
            </p>

            <h2>Intellectual property</h2>
            <p>
              All content on this site — including text, graphics, logos and product names — is owned by or licensed to
              Finkaizen and is protected by applicable intellectual-property laws. You may not reproduce it without our
              prior written consent.
            </p>

            <h2>No warranty</h2>
            <p>
              The site and its content are provided &ldquo;as is&rdquo; without warranties of any kind. Metrics and
              figures shown are illustrative and do not constitute a guarantee of performance or results.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Finkaizen is not liable for any indirect or consequential loss
              arising from your use of, or inability to use, this website.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms from time to time. Continued use of the site after changes are posted
              constitutes acceptance of the revised terms.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms? Email <a href="mailto:info@finkaizenai.com">info@finkaizenai.com</a>.
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
