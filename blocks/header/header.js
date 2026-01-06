import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia("(min-width: 900px)");

/**
 * Creates the BPCL header structure
 */
function createBPCLHeader() {
  const headerHTML = `
    <!-- Top Bar -->
    <div class="header-top-bar">
      <!-- Brand Section -->
      <div class="header-brand">
        <div class="header-logo-group">
          <a href="/" class="header-logo">
            <img src="/icons/bpcl-logo.svg" alt="BPCL Logo">
          </a>
          <a href="/" class="header-anniversary-logo">
            <img src="/icons/bpcl-50-logo.svg" alt="BPCL 50 Years">
          </a>
        </div>
        <div class="header-company-info">
          <div class="header-company-hindi">भारत पेट्रोलियम कॉर्पोरेशन लिमिटेड</div>
          <div class="header-company-english">Bharat Petroleum Corporation Limited</div>
          <div class="header-company-tagline">(A Maharatna Company)</div>
        </div>
      </div>

      <!-- Search Section -->
      <div class="header-search">
        <div class="header-search-container">
          <img src="/icons/search.svg" alt="Search" class="header-search-icon">
          <input type="text" class="header-search-input" placeholder="What are you looking for?">
          <img src="/icons/close.svg" alt="Clear" class="header-search-clear">
        </div>
      </div>

      <!-- Contact Section -->
      <div class="header-contact">
        <div class="header-smartline">
          <div class="header-smartline-logo">
            <span class="header-smartline-title"><span>S</span>mart Line</span>
          </div>
          <div class="header-smartline-info">
            <span class="header-smartline-number">Toll free 1800 22 4344</span>
            <span class="header-smartline-tagline">Ek Call...Sab Solve</span>
          </div>
        </div>
        <div class="header-bharatgas">
          <div class="header-bharatgas-logo">
            <img src="/icons/bharatgas-logo.svg" alt="Bharatgas">
          </div>
          <div class="header-bharatgas-info">
            <span>For LPG leakage complaints call</span>
            <span class="header-bharatgas-number">1906</span>
          </div>
        </div>
      </div>

      <!-- Mobile Hamburger -->
      <div class="header-hamburger" id="header-hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- Navigation Bar -->
    <div class="header-nav-bar" id="header-nav-bar">
      <div class="header-nav-close" id="header-nav-close"></div>
      <div class="header-nav-container">
        <ul class="header-nav-menu">
          <li class="header-nav-item">
            <a href="/" class="header-nav-link">Home</a>
          </li>
          <li class="header-nav-item has-dropdown">
            <span class="header-nav-link">About BPCL</span>
            <div class="header-dropdown">
              <a href="/about/overview" class="header-dropdown-item">Overview</a>
              <a href="/about/history" class="header-dropdown-item">History</a>
              <a href="/about/vision-mission" class="header-dropdown-item">Vision & Mission</a>
              <a href="/about/board-of-directors" class="header-dropdown-item">Board of Directors</a>
              <a href="/about/management" class="header-dropdown-item">Management</a>
            </div>
          </li>
          <li class="header-nav-item has-dropdown">
            <span class="header-nav-link">Bharat Petroleum For</span>
            <div class="header-dropdown">
              <a href="/for/retail-customers" class="header-dropdown-item">Retail Customers</a>
              <a href="/for/industrial-customers" class="header-dropdown-item">Industrial Customers</a>
              <a href="/for/aviation" class="header-dropdown-item">Aviation</a>
              <a href="/for/marine" class="header-dropdown-item">Marine</a>
              <a href="/for/lubricants" class="header-dropdown-item">Lubricants</a>
            </div>
          </li>
          <li class="header-nav-item has-dropdown">
            <span class="header-nav-link">Tenders</span>
            <div class="header-dropdown">
              <a href="/tenders/active" class="header-dropdown-item">Active Tenders</a>
              <a href="/tenders/upcoming" class="header-dropdown-item">Upcoming Tenders</a>
              <a href="/tenders/awarded" class="header-dropdown-item">Awarded Tenders</a>
            </div>
          </li>
          <li class="header-nav-item has-dropdown">
            <span class="header-nav-link">Careers</span>
            <div class="header-dropdown">
              <a href="/careers/current-openings" class="header-dropdown-item">Current Openings</a>
              <a href="/careers/why-bpcl" class="header-dropdown-item">Why BPCL</a>
              <a href="/careers/campus-recruitment" class="header-dropdown-item">Campus Recruitment</a>
            </div>
          </li>
          <li class="header-nav-item has-dropdown">
            <span class="header-nav-link">CSR</span>
            <div class="header-dropdown">
              <a href="/csr/initiatives" class="header-dropdown-item">CSR Initiatives</a>
              <a href="/csr/reports" class="header-dropdown-item">CSR Reports</a>
              <a href="/csr/policy" class="header-dropdown-item">CSR Policy</a>
            </div>
          </li>
          <li class="header-nav-item has-dropdown">
            <span class="header-nav-link">R&D Centre</span>
            <div class="header-dropdown">
              <a href="/rd/about" class="header-dropdown-item">About R&D</a>
              <a href="/rd/facilities" class="header-dropdown-item">Facilities</a>
              <a href="/rd/research-areas" class="header-dropdown-item">Research Areas</a>
            </div>
          </li>
          <li class="header-nav-item has-dropdown">
            <span class="header-nav-link">Sustainability</span>
            <div class="header-dropdown">
              <a href="/sustainability/environment" class="header-dropdown-item">Environment</a>
              <a href="/sustainability/social" class="header-dropdown-item">Social</a>
              <a href="/sustainability/governance" class="header-dropdown-item">Governance</a>
              <a href="/sustainability/reports" class="header-dropdown-item">Reports</a>
            </div>
          </li>
          <li class="header-nav-item has-dropdown">
            <span class="header-nav-link">Vigilance</span>
            <div class="header-dropdown">
              <a href="/vigilance/overview" class="header-dropdown-item">Overview</a>
              <a href="/vigilance/awareness" class="header-dropdown-item">Vigilance Awareness</a>
              <a href="/vigilance/complaints" class="header-dropdown-item">Lodge Complaint</a>
            </div>
          </li>
          <li class="header-nav-item has-dropdown">
            <span class="header-nav-link">RTI</span>
            <div class="header-dropdown">
              <a href="/rti/act" class="header-dropdown-item">RTI Act</a>
              <a href="/rti/pio" class="header-dropdown-item">PIO Details</a>
              <a href="/rti/disclosure" class="header-dropdown-item">Disclosure</a>
            </div>
          </li>
          <li class="header-nav-item">
            <a href="/complaints-feedback" class="header-nav-link">Complaints | Feedback</a>
          </li>
        </ul>
        <a href="/view-prices" class="header-view-prices">View Prices</a>
      </div>
    </div>
  `;

  return headerHTML;
}

/**
 * Initializes mobile menu functionality
 */
function initMobileMenu() {
  const hamburger = document.getElementById("header-hamburger");
  const navBar = document.getElementById("header-nav-bar");
  const closeBtn = document.getElementById("header-nav-close");

  if (hamburger && navBar) {
    hamburger.addEventListener("click", () => {
      navBar.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeBtn && navBar) {
    closeBtn.addEventListener("click", () => {
      navBar.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Handle dropdown toggles on mobile
  const dropdownItems = document.querySelectorAll(
    ".header-nav-item.has-dropdown"
  );
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (!isDesktop.matches) {
        e.stopPropagation();
        item.classList.toggle("active");
      }
    });
  });
}

/**
 * Initializes search functionality
 */
function initSearch() {
  const searchInput = document.querySelector(".header-search-input");
  const clearBtn = document.querySelector(".header-search-clear");

  if (searchInput && clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment (for any authored content)
  const navMeta = getMetadata("nav");
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : "/nav";

  try {
    await loadFragment(navPath);
  } catch (e) {
    // Fragment may not exist, continue with default header
  }

  // Create the BPCL header
  block.textContent = "";
  const navWrapper = document.createElement("div");
  navWrapper.className = "nav-wrapper";

  const nav = document.createElement("nav");
  nav.id = "nav";
  nav.innerHTML = createBPCLHeader();

  navWrapper.append(nav);
  block.append(navWrapper);

  // Initialize functionality
  initMobileMenu();
  initSearch();
}
