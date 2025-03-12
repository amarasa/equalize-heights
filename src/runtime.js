// src/runtime.js

// (Optional) Import polyfills so that Babel will include them in the bundle.
// This import will be removed from the final output if it isn’t needed,
// but it signals Babel to include the polyfill code.
import "core-js";

// Debounce helper function
function debounce(func, wait = 150) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}

// Your equalization function:
function equalizeHeights() {
	const elements = document.querySelectorAll('[class*="eh-"]');
	const groups = {};

	elements.forEach((el) => {
		el.classList.forEach((cls) => {
			if (cls.startsWith("eh-")) {
				if (!groups[cls]) {
					groups[cls] = [];
				}
				groups[cls].push(el);
			}
		});
	});

	Object.keys(groups).forEach((groupClass) => {
		let maxHeight = 0;
		groups[groupClass].forEach((el) => {
			el.style.height = "auto";
		});
		groups[groupClass].forEach((el) => {
			maxHeight = Math.max(maxHeight, el.offsetHeight);
		});
		groups[groupClass].forEach((el) => {
			el.style.height = `${maxHeight}px`;
		});
	});
}

// Create a debounced version for the resize event
const debouncedEqualizeHeights = debounce(equalizeHeights, 150);

// Run equalizeHeights immediately when the DOM is ready
if (
	document.readyState === "complete" ||
	document.readyState === "interactive"
) {
	equalizeHeights();
} else {
	document.addEventListener("DOMContentLoaded", equalizeHeights);
}

// Use the debounced function on window resize
window.addEventListener("resize", debouncedEqualizeHeights);

export default equalizeHeights;
