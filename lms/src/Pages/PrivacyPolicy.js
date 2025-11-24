
import React from "react";
import "./PolicyPage.css";

const PrivacyPolicy = () => {
  return (
    <div className="policy-wrapper">
      <div className="policy-card">
        <div className="policy-content">
          <h1 className="policy-title">Privacy Policy</h1>
          <p className="policy-intro">
            At <strong>VWX B2B (OPC) PVT LTD</strong>, we are committed to safeguarding the privacy of your data. 
            This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our platform.
          </p>

          <h2 className="policy-section">1. Information We Collect</h2>
          <ul className="policy-list">
            <li><strong>Personal Information:</strong> Name, email, phone number, and billing details.</li>
            <li><strong>Business Information:</strong> Website names, domain info, customer details (if added).</li>
            <li><strong>Usage Data:</strong> IP address, browser type, device info, and interaction history.</li>
          </ul>

          <h2 className="policy-section">2. How We Use Your Information</h2>
          <ul className="policy-list">
            <li>To provide platform services and customer support.</li>
            <li>To process orders and payments.</li>
            <li>To send important updates, transactional messages, and promotional emails.</li>
            <li>To improve website performance and user experience.</li>
          </ul>

          <h2 className="policy-section">3. Data Sharing</h2>
          <p className="policy-text">We do not sell or rent your personal data. Your data is only shared with:</p>
          <ul className="policy-list">
            <li>Secure payment gateways (e.g., Razorpay, UPI apps).</li>
            <li>Third-party hosting or analytics tools.</li>
            <li>Legal authorities, if required by law.</li>
          </ul>

          <h2 className="policy-section">4. Data Security</h2>
          <ul className="policy-list">
            <li>We use SSL encryption, firewall protection, and industry-standard hosting security.</li>
            <li>Only authorized personnel have access to sensitive data.</li>
          </ul>

          <h2 className="policy-section">5. Your Rights</h2>
          <p className="policy-text">You can:</p>
          <ul className="policy-list">
            <li>Access or update your information.</li>
            <li>Request data deletion.</li>
            <li>Opt out of non-essential communications.</li>
          </ul>

          <h2 className="policy-section">6. Third-Party Links</h2>
          <p className="policy-text">
            Our website may contain links to third-party tools or domains. VWX B2B (OPC) PVT LTD is not responsible for their privacy practices.
          </p>

          <h2 className="policy-section">7. Updates to This Policy</h2>
          <p className="policy-text">
            We may update our Privacy Policy at any time. Updated versions will be posted here with an effective date.
          </p>

          <hr className="policy-divider" />
          <p className="policy-footer">
            If you have questions about this Privacy Policy, contact us at <strong>info@yourdomain.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;