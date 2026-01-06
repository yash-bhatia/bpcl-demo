/**
 * Hero Block
 * Displays a hero section with background image, text, and optional button
 */
export default function decorate(block) {
  // Find all anchor links in the block and style them as buttons
  const links = block.querySelectorAll("a");

  links.forEach((link) => {
    // Check if the link is not already a button
    if (!link.classList.contains("button")) {
      link.classList.add("button");
    }

    // Check parent for button style hints
    const parent = link.parentElement;
    if (parent) {
      const text = parent.textContent.toLowerCase();
      if (text.includes("secondary")) {
        link.classList.add("secondary");
      }
    }
  });

  // Wrap button containers for better styling
  const buttonContainers = block.querySelectorAll(".button-container");
  if (buttonContainers.length > 0) {
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.className = "hero-buttons";

    buttonContainers.forEach((container) => {
      buttonsWrapper.appendChild(container.cloneNode(true));
    });

    // Find the content area and append buttons
    const contentDiv = block.querySelector("div > div:last-child");
    if (contentDiv && !contentDiv.querySelector(".hero-buttons")) {
      // Remove original button containers
      buttonContainers.forEach((container) => container.remove());
      contentDiv.appendChild(buttonsWrapper);
    }
  }
}
