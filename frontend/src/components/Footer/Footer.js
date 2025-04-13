import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <h2>🌿 Crop Advisory</h2>
          <p>
            Helping farmers make smarter crop rotation decisions using soil data and AI-powered insights.
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗</a>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Explore</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Advisory</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Contact Us</h2>
          <ul>
            <li>📞 +91-98765-43210</li>
            <li>📧 cropadvice@agroai.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        © 2025 Crop Advisory System — All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
