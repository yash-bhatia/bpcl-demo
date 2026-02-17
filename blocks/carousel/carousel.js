/**
 * BPCL Carousel Block
 * A full-width image carousel with navigation arrows, dots, and auto-play functionality
 */

const AUTOPLAY_INTERVAL = 5000; // 5 seconds between slides

/**
 * Creates navigation arrow SVG
 * @param {string} direction - 'prev' or 'next'
 * @returns {string} SVG markup
 */
function createArrowSVG(direction) {
  if (direction === "prev") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: none; stroke: #ffffff; stroke-width: 2.5;">
      <path d="M15 6 L9 12 L15 18" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: none; stroke: #ffffff; stroke-width: 2.5;">
    <path d="M9 6 L15 12 L9 18" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

/**
 * Creates pause/play button SVG icons
 * @returns {string} SVG markup for both icons
 */
function createControlSVG() {
  return `
    <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ffffff;">
      <rect x="6" y="5" width="4" height="14" rx="1"/>
      <rect x="14" y="5" width="4" height="14" rx="1"/>
    </svg>
    <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ffffff;">
      <polygon points="8,5 19,12 8,19"/>
    </svg>
  `;
}

/**
 * Carousel class to manage carousel functionality
 */
class Carousel {
  constructor(block) {
    this.block = block;
    this.currentSlide = 0;
    this.isPlaying = true;
    this.autoplayTimer = null;
    this.slides = [];
    this.dots = [];
    this.wasPlayingBeforeHover = false;

    this.init();
  }

  init() {
    // Build carousel structure from existing content
    this.buildCarousel();

    // Only setup if we have slides
    if (this.slides.length > 0) {
      this.setupEventListeners();
      this.startAutoplay();
    }
  }

  buildCarousel() {
    // Find all pictures in the block - handles both row-based and multi-image property structures
    const pictures = [...this.block.querySelectorAll("picture")];
    
    // If no pictures found, try finding standalone images
    const images = pictures.length === 0 ? [...this.block.querySelectorAll("img")] : [];

    if (pictures.length === 0 && images.length === 0) return;

    // Store original children for Universal Editor (hide them but keep in DOM)
    const originalChildren = [...this.block.children];
    const originalContent = document.createElement("div");
    originalContent.className = "carousel-original-content";
    originalChildren.forEach((child) => {
      originalContent.appendChild(child);
    });

    // Create main container
    const slidesContainer = document.createElement("div");
    slidesContainer.className = "carousel-slides-container";

    const slidesWrapper = document.createElement("div");
    slidesWrapper.className = "carousel-slides";

    // Process each picture as a slide
    pictures.forEach((picture, index) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.dataset.index = index;
      slide.appendChild(picture.cloneNode(true));
      slidesWrapper.appendChild(slide);
      this.slides.push(slide);
    });

    // Process standalone images if no pictures found
    images.forEach((img, index) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.dataset.index = index;
      slide.appendChild(img.cloneNode(true));
      slidesWrapper.appendChild(slide);
      this.slides.push(slide);
    });

    slidesContainer.appendChild(slidesWrapper);

    // Add both: hidden original content (for Universal Editor) + visible carousel
    this.block.textContent = "";
    this.block.appendChild(originalContent); // Hidden but in DOM for Universal Editor
    this.block.appendChild(slidesContainer); // Visible carousel

    this.slidesContainer = slidesContainer;
    this.slidesWrapper = slidesWrapper;

    // Only add controls if we have more than 1 slide
    if (this.slides.length > 1) {
      this.addNavigationControls();
    }

    // Always add the brand border
    this.addBrandBorder();
  }

  addNavigationControls() {
    // Create navigation arrows
    const prevBtn = document.createElement("button");
    prevBtn.className = "carousel-nav carousel-nav-prev";
    prevBtn.setAttribute("aria-label", "Previous slide");
    prevBtn.innerHTML = createArrowSVG("prev");
    this.slidesContainer.appendChild(prevBtn);
    this.prevBtn = prevBtn;

    const nextBtn = document.createElement("button");
    nextBtn.className = "carousel-nav carousel-nav-next";
    nextBtn.setAttribute("aria-label", "Next slide");
    nextBtn.innerHTML = createArrowSVG("next");
    this.slidesContainer.appendChild(nextBtn);
    this.nextBtn = nextBtn;

    // Create dots
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "carousel-dots";

    this.slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = `carousel-dot${index === 0 ? " active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });

    this.slidesContainer.appendChild(dotsContainer);

    // Create pause/play control
    const controlBtn = document.createElement("button");
    controlBtn.className = "carousel-control";
    controlBtn.setAttribute("aria-label", "Pause carousel");
    controlBtn.innerHTML = createControlSVG();
    this.slidesContainer.appendChild(controlBtn);
    this.controlBtn = controlBtn;
  }

  addBrandBorder() {
    const brandBorder = document.createElement("div");
    brandBorder.className = "carousel-brand-border";
    brandBorder.innerHTML = `
      <div class="carousel-brand-border-blue"></div>
      <div class="carousel-brand-border-yellow"></div>
      <div class="carousel-brand-border-green"></div>
    `;
    this.block.appendChild(brandBorder);
  }

  setupEventListeners() {
    // Previous button
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.prevSlide();
        this.resetAutoplay();
      });
    }

    // Next button
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.nextSlide();
        this.resetAutoplay();
      });
    }

    // Dots
    this.dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index, 10);
        this.goToSlide(index);
        this.resetAutoplay();
      });
    });

    // Pause/Play control
    if (this.controlBtn) {
      this.controlBtn.addEventListener("click", () => {
        this.toggleAutoplay();
      });
    }

    // Pause on hover
    this.block.addEventListener("mouseenter", () => {
      if (this.isPlaying) {
        this.pauseAutoplay();
        this.wasPlayingBeforeHover = true;
      }
    });

    this.block.addEventListener("mouseleave", () => {
      if (this.wasPlayingBeforeHover) {
        this.startAutoplay();
        this.wasPlayingBeforeHover = false;
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    this.block.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.block.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      },
      { passive: true }
    );

    // Keyboard navigation
    this.block.setAttribute("tabindex", "0");
    this.block.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prevSlide();
        this.resetAutoplay();
      } else if (e.key === "ArrowRight") {
        this.nextSlide();
        this.resetAutoplay();
      } else if (e.key === " ") {
        e.preventDefault();
        this.toggleAutoplay();
      }
    });
  }

  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.resetAutoplay();
    }
  }

  goToSlide(index) {
    if (index < 0) {
      this.currentSlide = this.slides.length - 1;
    } else if (index >= this.slides.length) {
      this.currentSlide = 0;
    } else {
      this.currentSlide = index;
    }

    // Update slide position
    const offset = -this.currentSlide * 100;
    this.slidesWrapper.style.transform = `translateX(${offset}%)`;

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === this.currentSlide);
    });
  }

  nextSlide() {
    this.goToSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentSlide - 1);
  }

  startAutoplay() {
    if (this.slides.length <= 1) return;

    this.isPlaying = true;
    if (this.controlBtn) {
      this.controlBtn.classList.remove("paused");
      this.controlBtn.setAttribute("aria-label", "Pause carousel");
    }

    this.autoplayTimer = setInterval(() => {
      this.nextSlide();
    }, AUTOPLAY_INTERVAL);
  }

  pauseAutoplay() {
    this.isPlaying = false;
    if (this.controlBtn) {
      this.controlBtn.classList.add("paused");
      this.controlBtn.setAttribute("aria-label", "Play carousel");
    }

    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  toggleAutoplay() {
    if (this.isPlaying) {
      this.pauseAutoplay();
    } else {
      this.startAutoplay();
    }
  }

  resetAutoplay() {
    if (this.isPlaying) {
      this.pauseAutoplay();
      this.startAutoplay();
    }
  }
}

/**
 * Decorates the carousel block
 * @param {Element} block The carousel block element
 */
export default function decorate(block) {
  // Always run full carousel - editor-support.js handles redecorating after edits
  // eslint-disable-next-line no-new
  new Carousel(block);
}
