
import React from "react";
import "./PolicyPage.css";

const TermsConditions = () => {
  return (
    <div className="policy-wrapper">
      <div className="policy-card">
        <div className="policy-content">
          <h1 className="policy-title">Terms & Conditions</h1>
          <p className="policy-intro">
            Welcome to <strong>VWX B2B (OPC) PVT LTD</strong>. By accessing, purchasing, or using our online DIY course platform 
            or any of its services, you agree to abide by the following Terms & Conditions. Please read them carefully.
          </p>

          <h2 className="policy-section">1. Acceptance of Terms</h2>
          <p className="policy-text">
            By registering, subscribing, or using our services, you agree to be legally bound by these Terms & Conditions, 
            along with our Privacy Policy and any other related policies. If you do not agree with any part, please do not use our platform.
          </p>

          <h2 className="policy-section">2. License Usage</h2>
          <ul className="policy-list">
            <li>You are granted a non-transferable, non-exclusive license to use our platform for commercial or personal use under the DIY format.</li>
            <li>You may use our service but not resell or redistribute our platform's backend or source code unless explicitly allowed.</li>
          </ul>

          <h2 className="policy-section">3. Account & Access</h2>
          <ul className="policy-list">
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>You may not allow others unauthorized access to your account.</li>
            <li>When you purchase a course, we grant you a limited, non-transferable, non-exclusive license to access and use the course content for personal, non-commercial purposes only.</li>
          </ul>

          <h2 className="policy-section">4. Pricing & Payments</h2>
          <ul className="policy-list">
            <li>VWX B2B (OPC) PVT LTD reserves the right to change prices, introduce offers, or discontinue services without prior notice.</li>
            <li>All payments made for services are non-refundable unless explicitly mentioned in our refund policy.</li>
            <li>All prices listed on our website are in INR and are subject to change without prior notice.</li>
            <li>Payments must be made via the methods provided on our website. You agree to provide accurate and complete payment information.</li>
          </ul>

          <h2 className="policy-section">5. Use Restrictions</h2>
          <p className="policy-text">You agree not to:</p>
          <ul className="policy-list">
            <li>Use our platform for illegal, abusive, or unethical purposes.</li>
            <li>Upload viruses or malicious code.</li>
            <li>Try to reverse-engineer, hack, or replicate our software.</li>
            <li>Use copyrighted or third-party content without proper rights or permissions.</li>
          </ul>

          <h2 className="policy-section">6. Intellectual Property</h2>
          <p className="policy-text">
            All content, modules, design templates, and backend functionalities provided by VWX B2B (OPC) PVT LTD remain the intellectual property of the company. 
            Unauthorized duplication or redistribution is prohibited.
          </p>

          <h2 className="policy-section">7. Termination of Services</h2>
          <p className="policy-text">
            We reserve the right to suspend or terminate your access at any time if you breach these terms, illegal or suspicious activities are found, or upon completion of 1 year from account creation as per plan terms.
          </p>

          <h2 className="policy-section">8. Limitation of Liability</h2>
          <p className="policy-text">
            To the fullest extent permitted by law, VWX B2B (OPC) PVT LTD and its affiliates are not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services.
          </p>

          <h2 className="policy-section">9. Support & Updates</h2>
          <p className="policy-text">
            We provide initial setup guidance and technical support as per the chosen plan. Software updates and feature enhancements are provided periodically. We may update the system without prior notice.
          </p>

          <h2 className="policy-section">10. Jurisdiction & Dispute Resolution</h2>
          <p className="policy-text">
            These terms shall be governed by the laws of India. Any disputes will be subject to the jurisdiction of Nagpur, Maharashtra courts only.
          </p>

          <hr className="policy-divider" />
          <p className="policy-footer">
            Questions? Contact us at <strong>info@yourdomain.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;