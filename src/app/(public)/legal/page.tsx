export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Legal Information</h1>
      
      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">1. Company Information</h2>
          <p>
            Scholar is an educational management platform operated by Scholar Inc. We are committed to 
            providing innovative solutions for educational institutions worldwide.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>Company Name:</strong> Scholar Inc.</p>
            <p><strong>Registered Address:</strong> [Address to be provided]</p>
            <p><strong>Registration Number:</strong> [Number to be provided]</p>
            <p><strong>Email:</strong> legal@scholar.com</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">2. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the 
            jurisdiction in which Scholar operates, and you irrevocably submit to the exclusive jurisdiction 
            of the courts in that location.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">3. Compliance</h2>
          <p>
            Scholar is committed to complying with all applicable laws and regulations, including but not 
            limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Data protection and privacy laws (GDPR, CCPA, etc.)</li>
            <li>Educational records privacy laws (FERPA, etc.)</li>
            <li>Accessibility standards (WCAG, ADA, etc.)</li>
            <li>Consumer protection laws</li>
            <li>Intellectual property laws</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">4. Data Protection Officer</h2>
          <p>
            We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions 
            in relation to this privacy policy. If you have any questions about this policy, including any 
            requests to exercise your legal rights, please contact the DPO at:
          </p>
          <p className="font-medium">Email: dpo@scholar.com</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">5. Dispute Resolution</h2>
          <p>
            In the event of any dispute arising out of or in connection with these terms, the parties shall 
            first attempt to resolve the dispute through good faith negotiations. If the dispute cannot be 
            resolved through negotiation, it shall be resolved through arbitration in accordance with the 
            rules of the applicable arbitration authority.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">6. Copyright Notice</h2>
          <p>
            All content included on this platform, such as text, graphics, logos, images, audio clips, 
            digital downloads, and software, is the property of Scholar or its content suppliers and 
            protected by international copyright laws.
          </p>
          <p className="font-medium mt-2">
            © {new Date().getFullYear()} Scholar Inc. All rights reserved.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">7. Trademark Notice</h2>
          <p>
            Scholar and its logo are trademarks of Scholar Inc. All other trademarks, product names, and 
            company names or logos cited herein are the property of their respective owners.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">8. DMCA Compliance</h2>
          <p>
            Scholar respects the intellectual property rights of others. If you believe that your work has 
            been copied in a way that constitutes copyright infringement, please provide our DMCA agent with 
            the following information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A physical or electronic signature of the copyright owner</li>
            <li>Identification of the copyrighted work claimed to have been infringed</li>
            <li>Identification of the infringing material</li>
            <li>Your contact information</li>
            <li>A statement of good faith belief</li>
            <li>A statement under penalty of perjury</li>
          </ul>
          <p className="mt-4 font-medium">DMCA Contact: dmca@scholar.com</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">9. Accessibility</h2>
          <p>
            Scholar is committed to ensuring digital accessibility for people with disabilities. We are 
            continually improving the user experience for everyone and applying the relevant accessibility 
            standards to achieve these goals.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">10. Cookie Policy</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our platform and hold 
            certain information. Cookies are files with a small amount of data which may include an 
            anonymous unique identifier. For more information about how we use cookies, please refer to 
            our Privacy Policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">11. Force Majeure</h2>
          <p>
            Scholar shall not be liable for any failure to perform its obligations where such failure is 
            as a result of acts of nature, war, riot, embargoes, acts of civil or military authorities, 
            fire, floods, accidents, pandemics, strikes, or any other events beyond our reasonable control.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">12. Severability</h2>
          <p>
            If any provision of these terms is found to be unenforceable or invalid under any applicable 
            law, such unenforceability or invalidity shall not render these terms unenforceable or invalid 
            as a whole, and such provisions shall be deleted without affecting the remaining provisions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">13. Contact Us</h2>
          <p>
            For any legal inquiries or concerns, please contact us at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>Legal Department</strong></p>
            <p>Email: legal@scholar.com</p>
            <p>Phone: [Phone number to be provided]</p>
            <p>Address: [Address to be provided]</p>
          </div>
        </section>
      </div>
    </div>
  );
}
