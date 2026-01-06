/**
 * Hero Block
 * Displays a hero section with image on left and content panel on right
 * Styled as BPCL Video Gallery component
 */
export default function decorate(block) {
  // Get the rows of the block
  const rows = [...block.children];

  if (rows.length === 0) return;

  // Check if we have the expected structure (image in first cell, content in second)
  const firstRow = rows[0];
  const cells = [...firstRow.children];

  // If single row with multiple cells, it's already structured correctly
  if (cells.length >= 2) {
    // Structure is: [image cell] [content cell]
    const imageCell = cells[0];
    const contentCell = cells[1];

    // Clean up image cell - ensure picture is direct child
    const picture = imageCell.querySelector("picture");
    if (picture) {
      imageCell.innerHTML = "";
      imageCell.appendChild(picture);
    }

    // Clean up content cell
    cleanupContentCell(contentCell, block);
  } else {
    // If structure is different, try to reorganize
    // Look for picture and content across all rows
    let pictureElement = null;
    let contentElements = [];

    rows.forEach((row) => {
      const picture = row.querySelector("picture");
      if (picture && !pictureElement) {
        pictureElement = picture;
      }

      // Collect non-picture content
      const clonedRow = row.cloneNode(true);
      const pics = clonedRow.querySelectorAll("picture");
      pics.forEach((p) => p.remove());

      if (clonedRow.textContent.trim() || clonedRow.querySelector("a")) {
        contentElements.push(...clonedRow.children);
      }
    });

    // Rebuild structure
    block.innerHTML = "";

    // Create image column
    const imageCol = document.createElement("div");
    if (pictureElement) {
      imageCol.appendChild(pictureElement);
    }
    block.appendChild(imageCol);

    // Create content column
    const contentCol = document.createElement("div");
    contentElements.forEach((el) => {
      contentCol.appendChild(el.cloneNode(true));
    });
    cleanupContentCell(contentCol, block);
    block.appendChild(contentCol);
  }
}

/**
 * Cleans up the content cell - removes "secondary" text, styles buttons
 * @param {Element} cell - The content cell element
 * @param {Element} block - The block element to get button text from
 */
function cleanupContentCell(cell, block) {
  // Find all anchor links and style them
  const links = cell.querySelectorAll("a");
  let isFirstButton = true;

  // Try to find buttonText from block content if present
  // It might be in a separate paragraph or as a data attribute
  let buttonText = null;

  // Look for any text that appears before or near the link that could be the button text
  const allText = cell.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
  allText.forEach((textEl) => {
    const text = textEl.textContent.trim();
    // Common button text patterns
    if (
      text.toLowerCase().includes("watch") ||
      text.toLowerCase().includes("learn") ||
      text.toLowerCase().includes("view") ||
      text.toLowerCase().includes("read") ||
      text.toLowerCase().includes("click") ||
      text.toLowerCase().includes("explore") ||
      text.toLowerCase().includes("discover")
    ) {
      // Check if this is a standalone text that could be button text
      if (!textEl.querySelector("a") && text.length < 50) {
        buttonText = text;
      }
    }
  });

  links.forEach((link) => {
    // Check if parent contains "secondary" text
    const parent = link.parentElement;
    const parentText = parent ? parent.textContent : "";
    const isSecondary = parentText.toLowerCase().includes("secondary");

    // Fix link text if it's showing a URL path instead of proper text
    const linkText = link.textContent.trim();
    if (
      linkText.startsWith("/content/") ||
      linkText.startsWith("/") ||
      linkText.match(/^https?:\/\//)
    ) {
      // Try to get text from title attribute first
      const title = link.getAttribute("title");
      if (title && !title.startsWith("/")) {
        link.textContent = title;
      } else if (buttonText) {
        link.textContent = buttonText;
        // Remove the source paragraph for buttonText if it was separate
        allText.forEach((textEl) => {
          if (
            textEl.textContent.trim() === buttonText &&
            !textEl.querySelector("a")
          ) {
            textEl.remove();
          }
        });
      } else {
        // Use a sensible default for common patterns
        link.textContent = "Watch video";
      }
    }

    if (isFirstButton && !isSecondary) {
      // First button gets primary style
      link.classList.add("button");
      isFirstButton = false;
    } else if (isSecondary) {
      // Secondary styled as plain link
      link.classList.remove("button");
    } else {
      // Additional buttons
      link.classList.add("button");
    }
  });

  // Remove standalone "secondary" text nodes
  const walker = document.createTreeWalker(
    cell,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const nodesToRemove = [];
  let node;
  while ((node = walker.nextNode())) {
    const trimmedText = node.textContent.trim().toLowerCase();
    if (trimmedText === "secondary") {
      nodesToRemove.push(node);
    }
  }

  nodesToRemove.forEach((n) => {
    const parent = n.parentElement;
    n.remove();
    // If parent is now empty, remove it too
    if (parent && !parent.textContent.trim() && !parent.querySelector("*")) {
      parent.remove();
    }
  });

  // Clean up empty paragraphs
  const emptyParagraphs = cell.querySelectorAll("p:empty");
  emptyParagraphs.forEach((p) => p.remove());

  // Remove button-container class to let our styles take over
  const buttonContainers = cell.querySelectorAll(".button-container");
  buttonContainers.forEach((container) => {
    // Keep the structure but remove the class if it interferes
    // container.classList.remove('button-container');
  });
}
