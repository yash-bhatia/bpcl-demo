/**
 * Ticker Block
 * A scrolling announcement bar with content moving from right to left
 * Features pause/resume functionality on hover and via controls
 */

export default function decorate(block) {
  // Get authored content from block
  const items = [...block.children];

  // Create ticker structure
  const tickerWrapper = document.createElement("div");
  tickerWrapper.className = "ticker-wrapper";

  const tickerTrack = document.createElement("div");
  tickerTrack.className = "ticker-track";

  // Process each authored item
  items.forEach((item) => {
    const tickerItem = document.createElement("div");
    tickerItem.className = "ticker-item";

    // Get the content from the authored row
    const cells = [...item.children];
    cells.forEach((cell) => {
      // Clone content preserving links and formatting
      const content = cell.cloneNode(true);
      content.className = "ticker-content";
      tickerItem.appendChild(content);
    });

    tickerTrack.appendChild(tickerItem);
  });

  // Duplicate content for seamless loop
  const trackClone = tickerTrack.cloneNode(true);
  trackClone.className = "ticker-track ticker-track-clone";

  tickerWrapper.appendChild(tickerTrack);
  tickerWrapper.appendChild(trackClone);

  // Create controls
  const controls = document.createElement("div");
  controls.className = "ticker-controls";

  const pauseBtn = document.createElement("button");
  pauseBtn.className = "ticker-pause-btn";
  pauseBtn.setAttribute("aria-label", "Pause ticker");
  pauseBtn.innerHTML = `
    <span class="ticker-icon-pause">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
    </span>
    <span class="ticker-icon-play" style="display: none;">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <polygon points="5,3 19,12 5,21"></polygon>
      </svg>
    </span>
  `;

  controls.appendChild(pauseBtn);

  // Clear block and add new structure
  block.textContent = "";
  block.appendChild(tickerWrapper);
  block.appendChild(controls);

  // Pause/Resume functionality
  let isPaused = false;

  const togglePause = () => {
    isPaused = !isPaused;
    const pauseIcon = pauseBtn.querySelector(".ticker-icon-pause");
    const playIcon = pauseBtn.querySelector(".ticker-icon-play");

    if (isPaused) {
      tickerWrapper.classList.add("paused");
      pauseIcon.style.display = "none";
      playIcon.style.display = "flex";
      pauseBtn.setAttribute("aria-label", "Resume ticker");
    } else {
      tickerWrapper.classList.remove("paused");
      pauseIcon.style.display = "flex";
      playIcon.style.display = "none";
      pauseBtn.setAttribute("aria-label", "Pause ticker");
    }
  };

  pauseBtn.addEventListener("click", togglePause);

  // Pause on hover (optional - can be disabled)
  tickerWrapper.addEventListener("mouseenter", () => {
    if (!isPaused) {
      tickerWrapper.classList.add("hover-paused");
    }
  });

  tickerWrapper.addEventListener("mouseleave", () => {
    tickerWrapper.classList.remove("hover-paused");
  });
}
