// src/runtime.js

// (Optional) Import polyfills so that Babel will include them in the bundle.
// This import will be removed from the final output if it isn’t needed,
// but it signals Babel to include the polyfill code.
import "core-js";

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

// Run when DOM is ready
if (
	document.readyState === "complete" ||
	document.readyState === "interactive"
) {
	equalizeHeights();
} else {
	document.addEventListener("DOMContentLoaded", equalizeHeights);
}
window.addEventListener("resize", equalizeHeights);

export default equalizeHeights;
