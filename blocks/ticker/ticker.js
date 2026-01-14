/**
 * Ticker Block
 * A scrolling announcement bar with content moving from right to left
 * Features pause on hover functionality
 */

export default function decorate(block) {
  // Get the text content from the first cell
  const firstRow = block.children[0];
  const firstCell = firstRow?.children[0];
  const textContent = firstCell?.textContent?.trim() || "";

  // Create ticker structure
  const tickerWrapper = document.createElement("div");
  tickerWrapper.className = "ticker-wrapper";

  const tickerTrack = document.createElement("div");
  tickerTrack.className = "ticker-track";

  // Create ticker item with the text
  const tickerItem = document.createElement("div");
  tickerItem.className = "ticker-item";

  const tickerText = document.createElement("span");
  tickerText.className = "ticker-text";
  tickerText.textContent = textContent;

  tickerItem.appendChild(tickerText);
  tickerTrack.appendChild(tickerItem);

  // Duplicate content for seamless loop
  const tickerItemClone = tickerItem.cloneNode(true);
  tickerTrack.appendChild(tickerItemClone);

  tickerWrapper.appendChild(tickerTrack);

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

  // Pause on hover (default enabled)
  tickerWrapper.addEventListener("mouseenter", () => {
    if (!isPaused) {
      tickerWrapper.classList.add("hover-paused");
    }
  });

  tickerWrapper.addEventListener("mouseleave", () => {
    tickerWrapper.classList.remove("hover-paused");
  });
}
