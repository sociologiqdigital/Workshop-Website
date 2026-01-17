import LegalLayout from "../common/LegalLayout";

const TermsAndConditions = () => {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="October 2023">
      <div className="space-y-8">
        <section>
          <h2 className="text-dark font-heading text-2xl mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing the SociologiQ website, you agree to comply with and be
            bound by these Terms and Conditions. Our services are tailored for
            sectors including Real Estate, Healthcare, and Hospitality.
          </p>
        </section>

        <section>
          <h2 className="text-dark font-heading text-2xl mb-4">
            2. Intellectual Property
          </h2>
          <p>
            All content, including the "Corporate Roots. Creative Wings."
            philosophy, brand strategies, and web development assets, are the
            intellectual property of SociologiQ and Ruchi Dorlikar. Unauthorized
            use of these materials is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-dark font-heading text-2xl mb-4">
            3. Service Engagement
          </h2>
          <p>
            Booking a "1-to-1 call" constitutes an inquiry and does not form a
            binding contract for services until a formal project agreement is
            signed. We reserve the right to refuse service to anyone for any
            reason at any time.
          </p>
        </section>

        <section>
          <h2 className="text-dark font-heading text-2xl mb-4">
            4. Limitation of Liability
          </h2>
          <p>
            SociologiQ shall not be liable for any indirect, incidental, or
            consequential damages resulting from the use of our digital
            strategies or marketing services. Results in SEO and Ads are subject
            to market fluctuations.
          </p>
        </section>

        <section>
          <h2 className="text-dark font-heading text-2xl mb-4">
            5. Governing Law
          </h2>
          <p>
            These terms are governed by and construed in accordance with the
            laws of India. Any disputes shall be subject to the exclusive
            jurisdiction of the courts in the founder's region.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};
export default TermsAndConditions;
