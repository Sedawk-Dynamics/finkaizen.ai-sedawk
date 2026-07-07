import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy · Finkaizen',
  description: 'How Finkaizen collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <>
      <header className="phead">
        <div className="grid-bg"></div>
        <div className="wrap">
          <div className="crumb">
            FINKAIZEN <span>/</span> PRIVACY
          </div>
          <div className="eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <p>
            This policy explains what information Finkaizen collects, how we use it, and the choices you have. It applies
            to this website and to enquiries you send us.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap two-col">
          <div className="prose reveal">
            <h2>Information we collect</h2>
            <p>
              When you submit the contact form we collect the details you provide — such as your name, email, phone
              number, organisation and message. We also collect standard technical data (browser type, device and
              anonymised usage) to keep the site secure and improve it.
            </p>

            <h2>How we use your information</h2>
            <ul>
              <li>To respond to your enquiries and requests for a demo.</li>
              <li>To provide, maintain and improve our website and services.</li>
              <li>To meet legal, regulatory and security obligations.</li>
            </ul>

            <h2>Data sharing</h2>
            <p>
              We do not sell your personal data. We share it only with trusted service providers who help us operate the
              business, and only where required by law.
            </p>

            <h2>Data retention</h2>
            <p>
              We retain personal data only for as long as necessary to fulfil the purposes described here or to comply
              with our legal obligations.
            </p>

            <h2>Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data. To exercise these rights,
              contact us at <a href="mailto:info@finkaizenai.com">info@finkaizenai.com</a>.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy? Email <a href="mailto:info@finkaizenai.com">info@finkaizenai.com</a>.
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
