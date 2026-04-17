export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
      
      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">1. Agreement to Terms</h2>
          <p>
            By accessing and using Scholar, you accept and agree to be bound by the terms and provisions 
            of this agreement. If you do not agree to these terms, please do not use our platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">2. Use License</h2>
          <p>
            Permission is granted to temporarily access and use Scholar for personal, non-commercial 
            transitory viewing only. This is the grant of a license, not a transfer of title, and under 
            this license you may not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or public display</li>
            <li>Attempt to reverse engineer any software contained on Scholar</li>
            <li>Remove any copyright or proprietary notations from the materials</li>
            <li>Transfer the materials to another person or mirror the materials on any other server</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current 
            information. Failure to do so constitutes a breach of these terms. You are responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintaining the confidentiality of your account and password</li>
            <li>Restricting access to your computer and account</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use of your account</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">4. Acceptable Use</h2>
          <p>You agree not to use Scholar:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>To transmit any unauthorized advertising or promotional material</li>
            <li>To impersonate or attempt to impersonate another user, person, or entity</li>
            <li>To engage in any conduct that restricts or inhibits anyone&apos;s use of the platform</li>
            <li>To harass, abuse, or harm another person</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">5. Intellectual Property</h2>
          <p>
            The platform and its original content, features, and functionality are and will remain the 
            exclusive property of Scholar and its licensors. The platform is protected by copyright, 
            trademark, and other laws. Our trademarks may not be used in connection with any product or 
            service without our prior written consent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">6. Content Ownership</h2>
          <p>
            You retain ownership of any content you submit, post, or display on Scholar. By submitting 
            content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, 
            modify, and display such content for the purpose of operating and improving our platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">7. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the platform immediately, without prior 
            notice or liability, for any reason, including if you breach these Terms. Upon termination, 
            your right to use the platform will immediately cease.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">8. Limitation of Liability</h2>
          <p>
            In no event shall Scholar, nor its directors, employees, partners, agents, suppliers, or 
            affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, 
            including loss of profits, data, use, or other intangible losses, resulting from your access to 
            or use of the platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">9. Disclaimer</h2>
          <p>
            Your use of Scholar is at your sole risk. The platform is provided on an &quot;AS IS&quot; and 
            &quot;AS AVAILABLE&quot; basis. We make no warranties, expressed or implied, regarding the 
            operation of the platform or the information, content, materials, or products included.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these terms at any time. If a revision is material, 
            we will provide at least 30 days&apos; notice prior to any new terms taking effect. What 
            constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="font-medium">Email: legal@scholar.com</p>
        </section>
      </div>
    </div>
  );
}
