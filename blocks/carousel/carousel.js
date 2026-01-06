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
  if (direction === 'prev') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
  </svg>`;
}

/**
 * Creates pause/play button SVG icons
 * @returns {string} SVG markup for both icons
 */
function createControlSVG() {
  return `
    <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
    <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
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

    this.init();
  }

  init() {
    // Get all slide content from the block
    this.extractSlides();

    // Build carousel structure
    this.buildCarousel();

    // Setup event listeners
    this.setupEventListeners();

    // Start autoplay
    this.startAutoplay();
  }

  extractSlides() {
    // Each row in the block becomes a slide
    const rows = [...this.block.children];
    this.slideData = rows.map((row) => {
      const picture = row.querySelector('picture');
      const content = row.querySelector('div:not(:has(picture))');
      return {
        picture: picture ? picture.outerHTML : '',
        content: content ? content.innerHTML : '',
      };
    });
  }

  buildCarousel() {
    // Clear original content
    this.block.textContent = '';

    // Create slides container
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'carousel-slides';

    // Create slides
    this.slideData.forEach((data, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.dataset.index = index;

      if (data.picture) {
        slide.innerHTML = data.picture;
      }

      if (data.content) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'carousel-slide-content';
        contentDiv.innerHTML = data.content;
        slide.appendChild(contentDiv);
      }

      slidesContainer.appendChild(slide);
      this.slides.push(slide);
    });

    this.block.appendChild(slidesContainer);
    this.slidesContainer = slidesContainer;

    // Create navigation arrows
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-nav carousel-nav-prev';
    prevBtn.setAttribute('aria-label', 'Previous slide');
    prevBtn.innerHTML = createArrowSVG('prev');
    this.block.appendChild(prevBtn);
    this.prevBtn = prevBtn;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-nav carousel-nav-next';
    nextBtn.setAttribute('aria-label', 'Next slide');
    nextBtn.innerHTML = createArrowSVG('next');
    this.block.appendChild(nextBtn);
    this.nextBtn = nextBtn;

    // Create dots
    if (this.slides.length > 1) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots';

      this.slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot${index === 0 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
        this.dots.push(dot);
      });

      this.block.appendChild(dotsContainer);
    }

    // Create pause/play control
    const controlBtn = document.createElement('button');
    controlBtn.className = 'carousel-control';
    controlBtn.setAttribute('aria-label', 'Pause carousel');
    controlBtn.innerHTML = createControlSVG();
    this.block.appendChild(controlBtn);
    this.controlBtn = controlBtn;

    // Create BPCL brand border
    const brandBorder = document.createElement('div');
    brandBorder.className = 'carousel-brand-border';
    brandBorder.innerHTML = `
      <div class="carousel-brand-border-blue"></div>
      <div class="carousel-brand-border-yellow"></div>
      <div class="carousel-brand-border-green"></div>
    `;
    this.block.appendChild(brandBorder);
  }

  setupEventListeners() {
    // Previous button
    this.prevBtn.addEventListener('click', () => {
      this.prevSlide();
      this.resetAutoplay();
    });

    // Next button
    this.nextBtn.addEventListener('click', () => {
      this.nextSlide();
      this.resetAutoplay();
    });

    // Dots
    this.dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index, 10);
        this.goToSlide(index);
        this.resetAutoplay();
      });
    });

    // Pause/Play control
    this.controlBtn.addEventListener('click', () => {
      this.toggleAutoplay();
    });

    // Pause on hover (optional UX enhancement)
    this.block.addEventListener('mouseenter', () => {
      if (this.isPlaying) {
        this.pauseAutoplay();
        this.wasPlayingBeforeHover = true;
      }
    });

    this.block.addEventListener('mouseleave', () => {
      if (this.wasPlayingBeforeHover) {
        this.startAutoplay();
        this.wasPlayingBeforeHover = false;
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    this.block.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.block.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });

    // Keyboard navigation
    this.block.setAttribute('tabindex', '0');
    this.block.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
        this.resetAutoplay();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetAutoplay();
      } else if (e.key === ' ') {
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
    this.slidesContainer.style.transform = `translateX(${offset}%)`;

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentSlide);
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
    this.controlBtn.classList.remove('paused');
    this.controlBtn.setAttribute('aria-label', 'Pause carousel');

    this.autoplayTimer = setInterval(() => {
      this.nextSlide();
    }, AUTOPLAY_INTERVAL);
  }

  pauseAutoplay() {
    this.isPlaying = false;
    this.controlBtn.classList.add('paused');
    this.controlBtn.setAttribute('aria-label', 'Play carousel');

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
  // eslint-disable-next-line no-new
  new Carousel(block);
}

