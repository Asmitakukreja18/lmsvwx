
import React from "react";
import "./PolicyPage.css";

const RefundPolicy = () => {
  return (
    <div className="policy-wrapper">
      <div className="policy-card">
        <div className="policy-content">
          <h1 className="policy-title">Refund Policy</h1>
          <p className="policy-intro">
            VWX B2B (OPC) PVT LTD strives to provide high-quality digital marketing courses and an exceptional learning experience. 
            However, we understand that sometimes you may need to request a refund. This Refund Policy outlines the terms under which refunds may be granted.
          </p>

          <h2 className="policy-section">1. Eligibility for Refunds</h2>
          <p className="policy-text">We offer refunds under the following conditions:</p>
          <ul className="policy-list">
            <li>If you have purchased a course but cannot access the course due to technical issues, you may be eligible for a refund. You must report the issue to our support team with evidence (screenshots, error logs) within 7 days of purchase.</li>
          </ul>

          <h2 className="policy-section">2. How to Request a Refund</h2>
          <p className="policy-text">
            To request a refund, send a registered email to <strong>info@yourdomain.com</strong> with your order details, reason for refund, and supporting evidence. 
            If approved, the refund will be credited to the original payment account within 7-10 business days.
          </p>

          <h2 className="policy-section">3. Changes to This Policy</h2>
          <p className="policy-text">
            We may update or modify this Refund Policy from time to time. Any changes will be posted on this page with an updated "Effective Date."
          </p>

          <hr className="policy-divider" />
          <p className="policy-footer">
            If you have questions regarding this Refund Policy, contact us at <strong>info@yourdomain.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;