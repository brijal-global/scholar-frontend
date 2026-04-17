export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimer</h1>
      
      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">1. Website Disclaimer</h2>
          <p>
            The information provided by Scholar on our platform is for general informational purposes only. 
            All information on the platform is provided in good faith; however, we make no representation or 
            warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, 
            availability, or completeness of any information on the platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">2. Educational Content</h2>
          <p>
            The platform provides educational management tools and services. While we strive to provide 
            accurate and up-to-date information, we make no warranties or representations about the 
            educational outcomes or results that may be achieved through use of our platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">3. External Links Disclaimer</h2>
          <p>
            The platform may contain (or you may be sent through the platform) links to other websites or 
            content belonging to or originating from third parties. Such external links are not investigated, 
            monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness 
            by us.
          </p>
          <p>
            We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability 
            of any information offered by third-party websites linked through the platform or any website or 
            feature linked in any banner or other advertising.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">4. Professional Disclaimer</h2>
          <p>
            The platform provides tools for educational administration and management. The information and 
            tools provided should not be considered as professional educational consulting, counseling, or 
            advice. Users should consult with appropriate educational professionals for specific guidance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">5. No Responsibility Disclaimer</h2>
          <p>
            The information on the platform is provided with the understanding that Scholar is not engaged 
            in rendering professional advice or services. As such, it should not be used as a substitute 
            for consultation with professional educational advisors or administrators.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">6. Use at Your Own Risk Disclaimer</h2>
          <p>
            All information on the platform is provided &quot;as is,&quot; with no guarantee of completeness, 
            accuracy, timeliness, or of the results obtained from the use of this information. Without 
            limiting the foregoing, we do not warrant that the platform will be uninterrupted or error-free.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">7. Academic Records Disclaimer</h2>
          <p>
            While we implement industry-standard security measures to protect academic records and personal 
            information, we cannot guarantee absolute security. Users are responsible for maintaining the 
            confidentiality of their account credentials and for any activity that occurs under their account.
          </p>
          <p>
            Educational institutions using our platform are responsible for verifying the accuracy of all 
            academic records, grades, and attendance information before making any official decisions based 
            on such data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">8. Technical Issues Disclaimer</h2>
          <p>
            We strive to maintain the platform&apos;s availability and performance. However, we do not 
            guarantee that the platform will be available at all times or that it will be free from errors, 
            bugs, or interruptions. We are not liable for any loss or damage resulting from technical issues, 
            including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>System downtime or maintenance</li>
            <li>Data loss or corruption</li>
            <li>Connectivity issues</li>
            <li>Software bugs or glitches</li>
            <li>Third-party service failures</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">9. Testimonials Disclaimer</h2>
          <p>
            The platform may feature testimonials from users. These testimonials reflect the real-life 
            experiences and opinions of such users. However, individual results may vary, and the 
            testimonials are not claims or guarantees that you will achieve the same results.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">10. Changes to Disclaimer</h2>
          <p>
            We may update our Disclaimer from time to time. We will notify you of any changes by posting 
            the new Disclaimer on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">11. Contact Information</h2>
          <p>
            If you have any questions about this Disclaimer, please contact us at:
          </p>
          <p className="font-medium">Email: support@scholar.com</p>
        </section>
      </div>
    </div>
  );
}
