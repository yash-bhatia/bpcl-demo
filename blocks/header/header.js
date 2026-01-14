import { getMetadata, decorateBlock, loadBlock } from "../../scripts/aem.js";
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
            <img src="https://www.bharatpetroleum.in/images/bpcl_transparent_logo_new.png" alt="BPCL Logo">
          </a>
        </div>
      </div>

      <!-- Search Section -->
      <div class="header-search">
        <div class="header-search-container">
          <img src="https://www.bharatpetroleum.in/images/search_icon.png" alt="Search" class="header-search-icon">
          <input type="text" class="header-search-input" placeholder="What are you looking for?">
          <span class="header-search-clear">&times;</span>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="header-contact">
        <div class="header-smartline">
        <img src="https://www.bharatpetroleum.in/images/img_smart-line.png" alt="Bharatgas">
        </div>
        <div class="header-bharatgas">
          <div class="header-bharatgas-logo">
            <img src="https://www.bharatpetroleum.in/images/bh-gas-logo.png" alt="Bharatgas">
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
          <li class="header-nav-item has-dropdown has-mega-menu">
            <span class="header-nav-link">Bharat Petroleum For</span>
            <div class="header-mega-dropdown">
              <div class="mega-menu-column column-1">
                <div class="mega-menu-item has-submenu" data-opens="column-2">
                  <span class="mega-menu-link">Our Businesses</span>
                  <span class="submenu-arrow">▸</span>
                </div>
                <a href="/for/refineries" class="mega-menu-item">Refineries</a>
                <a href="/for/investors" class="mega-menu-item">Investors</a>
                <div class="mega-menu-item has-submenu">
                  <span class="mega-menu-link">Business Associates</span>
                  <span class="submenu-arrow">▸</span>
                </div>
                <a href="/for/your-corner" class="mega-menu-item">Your Corner</a>
                <a href="/for/startups" class="mega-menu-item">Startups</a>
                <div class="mega-menu-item has-submenu">
                  <span class="mega-menu-link">For Retired Staff</span>
                  <span class="submenu-arrow">▸</span>
                </div>
              </div>
              <div class="mega-menu-column column-2" data-column="column-2">
                <div class="mega-menu-item has-submenu" data-opens="column-3">
                  <span class="mega-menu-link highlight">Fuels and Services</span>
                  <span class="submenu-arrow">▸</span>
                </div>
                <a href="/for/bharatgas" class="mega-menu-item">Bharatgas</a>
                <a href="/for/mak-lubricants" class="mega-menu-item">MAK Lubricants</a>
                <a href="/for/aviation-services" class="mega-menu-item">Aviation Services</a>
                <a href="/for/gas" class="mega-menu-item">Gas</a>
                <a href="/for/industrial-commercial" class="mega-menu-item">Industrial and Commercial</a>
                <a href="/for/international-trade" class="mega-menu-item">International Trade & Risk Management</a>
                <a href="/for/proficiency-testing" class="mega-menu-item">Proficiency Testing</a>
                <a href="/for/pipelines" class="mega-menu-item">Pipelines</a>
                <a href="/for/bpcl-group" class="mega-menu-item">BPCL group</a>
              </div>
              <div class="mega-menu-column column-3" data-column="column-3">
                <div class="mega-menu-item submenu-header">
                  <span class="mega-menu-link highlight">Fuels and Services</span>
                </div>
                <a href="/for/pure-for-sure" class="mega-menu-item">Pure For Sure</a>
                <a href="/index/smart-fleet" class="mega-menu-item">SmartFleet</a>
                <a href="/for/speed-fuels" class="mega-menu-item">Speed Fuels</a>
                <a href="/for/speed-97" class="mega-menu-item">Speed 97</a>
                <a href="/for/ufill" class="mega-menu-item">UFill</a>
                <a href="/for/petrocard" class="mega-menu-item">PetroCard</a>
                <a href="/for/bpcl-sbi-card" class="mega-menu-item">BPCL SBI Card</a>
                <a href="/for/smartdrive" class="mega-menu-item">SmartDrive</a>
                <a href="/for/door-to-door-delivery" class="mega-menu-item">Door to Door Delivery</a>
                <a href="/for/beyond-fuels" class="mega-menu-item">Beyond Fuels</a>
                <a href="/for/mak-quik" class="mega-menu-item">MAK Quik</a>
                <a href="/for/ghar" class="mega-menu-item">Ghar</a>
              </div>
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
 * Updates border classes based on visible columns
 */
function updateColumnBorders(megaDropdown) {
  if (!megaDropdown) return;

  const columns = megaDropdown.querySelectorAll(".mega-menu-column");
  columns.forEach((col) => col.classList.remove("has-visible-sibling"));

  // Check if column-2 is visible, add border to column-1
  const col1 = megaDropdown.querySelector(".column-1");
  const col2 = megaDropdown.querySelector(".column-2");
  const col3 = megaDropdown.querySelector(".column-3");

  if (col2 && col2.classList.contains("visible") && col1) {
    col1.classList.add("has-visible-sibling");
  }
  if (col3 && col3.classList.contains("visible") && col2) {
    col2.classList.add("has-visible-sibling");
  }
}

/**
 * Initializes mega menu click-based column reveal
 */
function initMegaMenu() {
  const megaMenuItems = document.querySelectorAll(
    ".mega-menu-item.has-submenu[data-opens]"
  );

  megaMenuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const targetColumn = item.getAttribute("data-opens");
      const megaDropdown = item.closest(".header-mega-dropdown");

      if (megaDropdown && targetColumn) {
        // Find the target column
        const column = megaDropdown.querySelector(
          `[data-column="${targetColumn}"]`
        );

        if (column) {
          // Toggle the column visibility
          const isVisible = column.classList.contains("visible");

          // Hide all columns after the current one if clicking the same item
          if (isVisible) {
            column.classList.remove("visible");
            // Hide any columns after this one
            const columnNumber = parseInt(targetColumn.replace("column-", ""));
            for (let i = columnNumber + 1; i <= 5; i++) {
              const nextColumn = megaDropdown.querySelector(
                `[data-column="column-${i}"]`
              );
              if (nextColumn) nextColumn.classList.remove("visible");
            }
            item.classList.remove("active");
          } else {
            column.classList.add("visible");
            item.classList.add("active");
          }

          // Update borders
          updateColumnBorders(megaDropdown);
        }
      }
    });
  });

  // Close mega menu columns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-mega-menu")) {
      const visibleColumns = document.querySelectorAll(
        ".mega-menu-column.visible"
      );
      visibleColumns.forEach((col) => {
        col.classList.remove("visible");
        col.classList.remove("has-visible-sibling");
      });
      const activeItems = document.querySelectorAll(
        ".mega-menu-item.has-submenu.active"
      );
      activeItems.forEach((item) => item.classList.remove("active"));
      // Remove borders from column-1
      const col1 = document.querySelector(".mega-menu-column.column-1");
      if (col1) col1.classList.remove("has-visible-sibling");
    }
  });

  // Reset columns when leaving the mega menu
  const megaMenu = document.querySelector(".has-mega-menu");
  if (megaMenu) {
    megaMenu.addEventListener("mouseleave", () => {
      const visibleColumns = megaMenu.querySelectorAll(
        ".mega-menu-column.visible"
      );
      visibleColumns.forEach((col) => {
        col.classList.remove("visible");
        col.classList.remove("has-visible-sibling");
      });
      const activeItems = megaMenu.querySelectorAll(
        ".mega-menu-item.has-submenu.active"
      );
      activeItems.forEach((item) => item.classList.remove("active"));
      // Remove borders from column-1
      const col1 = megaMenu.querySelector(".mega-menu-column.column-1");
      if (col1) col1.classList.remove("has-visible-sibling");
    });
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Load nav fragment to get authored content
  const navMeta = getMetadata("nav");
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : "/nav";

  let fragmentContent = null;
  try {
    fragmentContent = await loadFragment(navPath);
  } catch (e) {
    // Fragment may not exist, continue with default header
  }

  // Clear the block
  block.textContent = "";

  // Create the nav wrapper with hardcoded header FIRST
  const navWrapper = document.createElement("div");
  navWrapper.className = "nav-wrapper";

  const nav = document.createElement("nav");
  nav.id = "nav";
  nav.innerHTML = createBPCLHeader();

  navWrapper.append(nav);
  block.append(navWrapper);

  // Create wrapper for authored content (from fragment) - AFTER the header
  const authoredWrapper = document.createElement("div");
  authoredWrapper.className = "header-authored-content";

  // Extract and add authored blocks from fragment (like ticker)
  // MOVE elements instead of cloning to preserve event handlers
  if (fragmentContent) {
    // Find all blocks in the fragment
    const fragmentBlocks = [...fragmentContent.querySelectorAll(".block")];

    for (const fragmentBlock of fragmentBlocks) {
      // Move the block (preserves event handlers)
      authoredWrapper.appendChild(fragmentBlock);
    }

    // Also check for any sections with content
    const sections = [...fragmentContent.querySelectorAll(".section")];
    for (const section of sections) {
      const sectionBlocks = section.querySelectorAll(".block");
      if (sectionBlocks.length === 0 && section.textContent.trim()) {
        // Section without blocks - might have direct content
        authoredWrapper.appendChild(section);
      }
    }
  }

  // Add authored content BELOW the header
  if (authoredWrapper.children.length > 0) {
    block.append(authoredWrapper);
  }

  // Initialize functionality
  initMobileMenu();
  initSearch();
  initMegaMenu();
}
