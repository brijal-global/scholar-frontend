export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">1. Introduction</h2>
          <p>
            Welcome to Scholar. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit 
            our platform and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">2. Information We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> First name, last name, username, date of birth</li>
            <li><strong>Contact Data:</strong> Email address, phone number, physical address</li>
            <li><strong>Technical Data:</strong> IP address, browser type, time zone, operating system</li>
            <li><strong>Usage Data:</strong> Information about how you use our platform</li>
            <li><strong>Academic Data:</strong> Student records, grades, attendance, course information</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">3. How We Use Your Information</h2>
          <p>We use your personal data for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our service</li>
            <li>To manage your account and registration</li>
            <li>To track student attendance and academic progress</li>
            <li>To communicate with you about your account or courses</li>
            <li>To improve our platform and user experience</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">4. Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being 
            accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal 
            data to those employees, agents, contractors, and other third parties who have a business need 
            to know.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">5. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we 
            collected it for, including for the purposes of satisfying any legal, accounting, or reporting 
            requirements.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">6. Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access your personal data</li>
            <li>The right to request correction of your personal data</li>
            <li>The right to request erasure of your personal data</li>
            <li>The right to object to processing of your personal data</li>
            <li>The right to request restriction of processing your personal data</li>
            <li>The right to request transfer of your personal data</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">7. Third-Party Links</h2>
          <p>
            Our platform may include links to third-party websites, plug-ins, and applications. Clicking 
            on those links or enabling those connections may allow third parties to collect or share data 
            about you. We do not control these third-party websites and are not responsible for their 
            privacy statements.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">8. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p className="font-medium">Email: privacy@scholar.com</p>
        </section>
      </div>
    </div>
  );
}
