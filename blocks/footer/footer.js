import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Creates the BPCL footer structure
 */
function createBPCLFooter() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const footerHTML = `
    <!-- Footer Main Section -->
    <div class="footer-main">
      <!-- Column 1: About BPCL -->
      <div class="footer-column">
        <h3 class="footer-column-title">About BPCL</h3>
        <ul class="footer-links">
          <li><a href="/about/our-journey">Our Journey</a></li>
          <li><a href="/about/board-of-directors">Board of Directors</a></li>
          <li><a href="/about/vision-values">Vision & Values</a></li>
          <li><a href="/about/awards-accolades">Awards & Accolades</a></li>
          <li><a href="/about/our-policies">Our Policies</a></li>
          <li><a href="/about/audit">Audit</a></li>
          <li><a href="/about/bpcl-infoline">BPCL Infoline</a></li>
        </ul>
      </div>

      <!-- Column 2: Our Businesses -->
      <div class="footer-column">
        <h3 class="footer-column-title">Our Businesses</h3>
        <ul class="footer-links">
          <li><a href="/businesses/fuels-services">Fuels & Services</a></li>
          <li><a href="/businesses/bharatgas">Bharatgas</a></li>
          <li><a href="/businesses/mak-lubricants">MAK Lubricants</a></li>
          <li><a href="/businesses/aviation">Aviation</a></li>
          <li><a href="/businesses/refinery">Refinery</a></li>
          <li><a href="/businesses/gas">Gas</a></li>
          <li><a href="/businesses/industrial-commercial">Industrial & Commercial</a></li>
          <li><a href="/businesses/bprl">BPRL</a></li>
          <li><a href="/businesses/international-trade">International Trade</a></li>
          <li><a href="/businesses/proficiency-testing">Proficiency Testing</a></li>
          <li><a href="/businesses/bpcl-group">BPCL Group</a></li>
        </ul>
      </div>

      <!-- Column 3: Bharat Petroleum For -->
      <div class="footer-column">
        <h3 class="footer-column-title">Bharat Petroleum For</h3>
        <ul class="footer-links">
          <li><a href="/for/motorists-fleet-owners">Motorists/Fleet owners</a></li>
          <li><a href="/for/households">Households</a></li>
          <li><a href="/for/aviation">Aviation</a></li>
          <li><a href="/for/investor">Investor</a></li>
          <li><a href="/for/business-associates">Business & Associates</a></li>
          <li><a href="/for/industries">Industries</a></li>
          <li><a href="/for/your-corner">Your Corner</a></li>
          <li><a href="/for/startups">Startups</a></li>
          <li><a href="/for/mb-lal-recommendations" class="footer-btn-link">M. B. Lal Recommendations</a></li>
        </ul>
      </div>

      <!-- Column 4: Important Links -->
      <div class="footer-column">
        <h3 class="footer-column-title">Important Links</h3>
        <ul class="footer-links">
          <li><a href="/policies/website-compliance">Website Compliance Policy</a></li>
          <li><a href="/policies/hyperlink">Hyperlink Policy</a></li>
          <li><a href="/rti">RTI</a></li>
          <li><a href="/mb-lal-recommendations">M. B. Lal Recommendations</a></li>
          <li><a href="/payment-gateway">Payment Gateway for direct remittances to BPCL</a></li>
          <li><a href="/complain-feedback">Complain/Feedback</a></li>
          <li><a href="/customer-care">Customer Care</a></li>
          <li><a href="/information-reports">Information and Reports</a></li>
        </ul>
      </div>

      <!-- Column 5: Connect With Us -->
      <div class="footer-column">
        <h3 class="footer-column-title">Connect With Us</h3>
        <a href="tel:18002244344" class="footer-connect-item">
          <span class="footer-connect-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </span>
          SmartLine
        </a>
        <a href="/feedback" class="footer-connect-item">
          <span class="footer-connect-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </span>
          Feedback
        </a>
        <a href="/locate-us" class="footer-connect-item">
          <span class="footer-connect-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </span>
          Locate Us
        </a>

        <h4 class="footer-apps-title">Apps</h4>
        <a href="https://play.google.com/store" target="_blank" rel="noopener" class="footer-app-link">Google Play</a>
        <a href="https://apps.apple.com" target="_blank" rel="noopener" class="footer-app-link">Apple App Store</a>
      </div>

      <!-- Column 6: Other Links -->
      <div class="footer-column">
        <h3 class="footer-column-title">Other Links</h3>
        <ul class="footer-links">
          <li><a href="/tenders">Tenders</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/investors">Investors</a></li>
          <li><a href="/sustainability">Sustainability</a></li>
        </ul>
      </div>
    </div>

    <!-- Footer Bottom Bar - Policy Links Section -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <!-- Policy Links Row -->
        <div class="footer-policy-row">
          <div class="footer-policy-links">
            <a href="/website-policy">Website Policy</a>
            <a href="/help">Help</a>
            <a href="/accessibility-statement">Accessibility Statement</a>
            <a href="/complaint-feedback">Complaint / Feedback</a>
            <a href="/sitemap">Sitemap</a>
            <a href="/faqs">FAQs</a>
          </div>
          <div class="footer-gov-logos">
            <img src="/icons/india-gov-logo.svg" alt="India.gov.in" class="footer-gov-logo">
            <img src="/icons/mygov-logo.svg" alt="MyGov" class="footer-gov-logo">
            <img src="/icons/data-gov-logo.svg" alt="Data.gov.in" class="footer-gov-logo">
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Copyright Section - Darker Background -->
    <div class="footer-copyright-section">
      <div class="footer-copyright-content">
        <!-- Copyright Row -->
        <div class="footer-copyright-row">
          <p class="footer-copyright">
            Copyright © 2023- All Rights Reserved - Official Website of Bharat Petroleum Corporation Limited | Ministry of Petroleum and Natural Gas, Government of India.<br>
            Content on this website is Published and Managed by Bharat Petroleum Corporation Limited
          </p>
          <p class="footer-contact-info">
            For any query regarding this website, please contact the "Web Information Manager" Sheilagh Nair - General Manager (PR & Brand),<br>
            Contact No.: +91-22-22713000 Email ID: <a href="mailto:info@bharatpetroleum.in">info[at]bharatpetroleum[dot]in</a>
          </p>
        </div>

        <!-- Validation Badges -->
        <div class="footer-validation-row">
          <img src="/icons/w3c-html-badge.svg" alt="W3C HTML Valid" class="footer-badge">
          <img src="/icons/w3c-css-badge.svg" alt="W3C CSS Valid" class="footer-badge">
        </div>

        <!-- Update Info -->
        <div class="footer-update-row">
          <p>Website Last Updated on ${lastUpdated}</p>
          <p>Best viewed on "Google chrome v 120+, Firefox v 115+, Microsoft edge v 120+ and Safari 16+".</p>
        </div>
      </div>
    </div>
  `;

  return footerHTML;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment (for any authored content)
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';

  try {
    await loadFragment(footerPath);
  } catch (e) {
    // Fragment may not exist, continue with default footer
  }

  // Create the BPCL footer
  block.textContent = '';
  const footer = document.createElement('div');
  footer.innerHTML = createBPCLFooter();

  block.append(footer);
}
