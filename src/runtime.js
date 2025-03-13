// src/runtime.js

// (Optional) Import polyfills so that Babel will include them in the bundle.
import "core-js";

// Debounce helper function
function debounce(func, wait = 150) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}

// Equalization function that supports data attributes for grouping
function equalizeHeights() {
	// Re-read user options on every run
	const options = window.equalizeHeightsOptions || {};
	const minWidthBreakpoint = options.minWidth || 0;

	console.log("equalizeHeightsOptions:", options);
	console.log(
		"Current window width:",
		window.innerWidth,
		"Min width required:",
		minWidthBreakpoint
	);

	// If the window width is below the breakpoint, reset heights and exit.
	if (window.innerWidth < minWidthBreakpoint) {
		console.log(
			"Window width below breakpoint. Resetting heights to auto."
		);
		const allElements = document.querySelectorAll(
			'[class*="eh-"], [data-equalize]'
		);
		allElements.forEach((el) => {
			el.style.height = "auto";
		});
		return;
	}

	// Select elements by data attribute or class
	const elements = document.querySelectorAll(
		'[data-equalize], [class*="eh-"]'
	);
	const groups = {};

	elements.forEach((el) => {
		// Use the data attribute if present; otherwise, find the first matching class
		let groupKey = el.getAttribute("data-equalize");
		if (!groupKey) {
			groupKey = Array.from(el.classList).find((cls) =>
				cls.startsWith("eh-")
			);
		}
		if (groupKey) {
			if (!groups[groupKey]) {
				groups[groupKey] = [];
			}
			groups[groupKey].push(el);
		}
	});

	// For each group, calculate the maximum height and apply it
	Object.keys(groups).forEach((groupKey) => {
		let maxHeight = 0;
		groups[groupKey].forEach((el) => {
			el.style.height = "auto"; // Reset to natural height
		});
		groups[groupKey].forEach((el) => {
			maxHeight = Math.max(maxHeight, el.offsetHeight);
		});
		groups[groupKey].forEach((el) => {
			el.style.height = `${maxHeight}px`;
		});
		console.log(`Equalized group ${groupKey} to height ${maxHeight}px`);
	});
}

// Create a debounced version for the resize event
const debouncedEqualizeHeights = debounce(equalizeHeights, 150);

// Run equalizeHeights when DOM is ready
if (
	document.readyState === "complete" ||
	document.readyState === "interactive"
) {
	equalizeHeights();
} else {
	document.addEventListener("DOMContentLoaded", equalizeHeights);
}

// Use the debounced version on window resize
window.addEventListener("resize", debouncedEqualizeHeights);

export default equalizeHeights;
