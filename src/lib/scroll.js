export function scrollToElement(elementId, options = {}) {
  const el = typeof elementId === 'string' ? document.getElementById(elementId) : elementId;
  if (!el) return;

  // 1. Calculate the actual height of the sticky navbar + announcement bar
  const navbar = document.querySelector('.navbar');
  let headerHeight = 100; // Fallback default
  if (navbar) {
    headerHeight = navbar.getBoundingClientRect().bottom;
  }

  // 2. Calculate actual (untransformed) vertical position of the element top
  let actualTop = el.getBoundingClientRect().top + window.pageYOffset;
  let curr = el;
  while (curr && curr !== document.body) {
    const style = window.getComputedStyle(curr);
    const matrix = style.transform || style.webkitTransform || style.mozTransform;
    if (matrix && matrix !== 'none') {
      const parts = matrix.split('(')[1].split(')')[0].split(',');
      let ty = 0;
      if (parts.length === 6) {
        ty = parseFloat(parts[5]);
      } else if (parts.length === 16) {
        ty = parseFloat(parts[13]);
      }
      if (!isNaN(ty)) {
        actualTop -= ty;
      }
    }
    curr = curr.parentElement;
  }

  // 3. Viewport metrics
  const viewportHeight = window.innerHeight;
  const cardHeight = el.getBoundingClientRect().height;
  const availableHeight = viewportHeight - headerHeight;

  let targetY;
  if (cardHeight < availableHeight) {
    // Center the element in the available viewport space
    const remainingSpace = availableHeight - cardHeight;
    targetY = actualTop - headerHeight - (remainingSpace / 2);
  } else {
    // Align the top of the element below the navbar with some padding (e.g., 20px)
    targetY = actualTop - headerHeight - 20;
  }

  window.scrollTo({
    top: Math.max(0, targetY),
    behavior: options.behavior || 'smooth'
  });
}
