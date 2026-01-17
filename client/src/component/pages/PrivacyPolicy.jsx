import LegalLayout from "../common/LegalLayout";

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="October 2023">
      <div className="space-y-8">
        <section>
          <h2 className="text-dark font-heading text-2xl mb-4">
            1. Introduction
          </h2>
          <p>
            At SociologiQ, we are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your
            information when you visit our website or engage with our digital
            services, including Performance Marketing and Content Creation.
          </p>
        </section>

        <section>
          <h2 className="text-dark font-heading text-2xl mb-4">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Personal Data:</strong> Name, email address, and phone
              number provided during inquiries or 1-to-1 call bookings.
            </li>
            <li>
              <strong>Usage Data:</strong> IP addresses, browser types, and page
              interaction data collected via cookies for Digital Strategy
              optimization.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-dark font-heading text-2xl mb-4">
            3. How We Use Your Data
          </h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Deliver tailored digital strategies and branding services.</li>
            <li>Improve website performance through SEO and data analysis.</li>
            <li>Communicate regarding leadership vision or project updates.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-dark font-heading text-2xl mb-4">
            4. Data Security
          </h2>
          <p>
            We implement high-end security measures to maintain the safety of
            your personal information. However, please note that no method of
            electronic storage is 100% secure.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
