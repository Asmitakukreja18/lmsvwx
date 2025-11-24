import React from "react";
import "./About.css";

const About = () => {
  return (
    <>
      <section className="hero">
        <h1>Our Story</h1>
      </section>

      <section className="about-info">
        <div className="left">
          <h2>40+ Online Courses</h2>
          <h3>VWX B2B (OPC) PVT LTD</h3>
        </div>

        <div className="right">
          <h2>Background</h2>
          <p>We Are In IT And Real Estate Sector</p>
        </div>
      </section>

      <section className="ventures">
        <h2>Group Of Ventures</h2>

        <div className="venture-grid">

          <div className="venture">
            <div className="icon">
              <i className="fa-solid fa-lock-open"></i>
            </div>
            <div>
              <h3>SARAF FARMS</h3>
              <p>Deals In Farmland</p>
            </div>
          </div>

          <div className="venture">
            <div className="icon">
              <i className="fa-solid fa-lock-open"></i>
            </div>
            <div>
              <h3>R K FARMLANDS</h3>
              <p>Deals In Farmhouses</p>
            </div>
          </div>

          <div className="venture">
            <div className="icon">
              <i className="fa-solid fa-lock-open"></i>
            </div>
            <div>
              <h3>SARAF LLP</h3>
              <p>Deals In Real Estate</p>
            </div>
          </div>

          <div className="venture">
            <div className="icon">
              <i className="fa-solid fa-star"></i>
            </div>
            <div>
              <h3>DECCAN FARMS</h3>
              <p>Deals In Agricultural Lands</p>
            </div>
          </div>

        </div>
      </section>

      {/* QUOTES */}
      <section className="quotes">
        <h2>Qoute Of The Day</h2>

        <div className="quote-grid">

          <div className="quote red">
            <p>
              "सीखने की कोई उम्र नहीं होती, और हर दिन ज्ञान बढ़ाने का एक नया अवसर है।
              आपकी उपलब्धियों की नींव आज से सीखना शुरू करने पर ही रखी जाती है।"
            </p>
            <h4>VWX B2B OPC PVT LTD</h4>
            <span>Nagpur</span>
          </div>

          <div className="quote gray">
            <p>
              ज्ञान का सफर कभी खत्म नहीं होता – हर दिन एक नया अध्याय आपके इंतजार में है।
              अपनी सीमाओं को चुनौती दें, हर दिन एक नया कौशल सीखें — आपकी तरक्की की कुंजी आपके हाथ में है।
            </p>
            <h4>VWX B2B OPC PVT LTD</h4>
            <span>Nagpur</span>
          </div>

          <div className="quote blue">
            <p>
              अगर आप रुक गए हैं, तो अब सीखना शुरू करें।
              ज्ञान ही आपको आगे बढ़ने की शक्ति देता है; जितना सीखेंगे, उतना आगे बढ़ेंगे।
            </p>
            <h4>VWX B2B OPC PVT LTD</h4>
            <span>Nagpur</span>
          </div>

          <div className="quote green">
            <p>आज ही अपनी काबिलियत की सीमा तोड़ें, और सीखने के सफर पर निकलें!"</p>
            <h4>VWX B2B OPC PVT LTD</h4>
            <span>Nagpur</span>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;
