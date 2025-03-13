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

// Determine what action to take ("equalize" or "reset") based on advanced breakpoints.
// If window.equalizeHeightsOptions.breakpoints is defined, iterate through it and return the corresponding action.
// Otherwise, fall back to the legacy minWidth check.
function getCurrentAction() {
	const options = window.equalizeHeightsOptions || {};
	if (options.breakpoints && Array.isArray(options.breakpoints)) {
		for (let bp of options.breakpoints) {
			const min = bp.min !== undefined ? bp.min : 0;
			const max = bp.max !== undefined ? bp.max : Infinity;
			if (window.innerWidth >= min && window.innerWidth <= max) {
				return bp.action; // Expected to be either "equalize" or "reset"
			}
		}
	} else if (options.minWidth) {
		return window.innerWidth < options.minWidth ? "reset" : "equalize";
	}
	return "equalize";
}

function equalizeHeights() {
	const options = window.equalizeHeightsOptions || {};
	const action = getCurrentAction();
	console.log(
		"Current action:",
		action,
		"at window width:",
		window.innerWidth
	);

	// If the action is "reset", clear heights and (if provided) call the callback with an empty groups object.
	if (action === "reset") {
		console.log("Action is reset: setting heights to auto.");
		const allElements = document.querySelectorAll(
			'[data-equalize], [class*="eh-"]'
		);
		allElements.forEach((el) => {
			el.style.height = "auto";
		});
		if (typeof options.callback === "function") {
			options.callback({});
		}
		return;
	}

	// Select elements by data attribute or class.
	const elements = document.querySelectorAll(
		'[data-equalize], [class*="eh-"]'
	);
	const groups = {};

	elements.forEach((el) => {
		// Prefer grouping by data attribute if available.
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

	Object.keys(groups).forEach((groupKey) => {
		let maxHeight = 0;
		groups[groupKey].forEach((el) => {
			el.style.height = "auto";
		});
		groups[groupKey].forEach((el) => {
			maxHeight = Math.max(maxHeight, el.offsetHeight);
		});
		groups[groupKey].forEach((el) => {
			el.style.height = `${maxHeight}px`;
		});
		console.log(`Equalized group ${groupKey} to height ${maxHeight}px`);
	});

	// Execute the callback function if provided.
	if (typeof options.callback === "function") {
		options.callback(groups);
	}
}

// Create a debounced version for the resize event.
const debouncedEqualizeHeights = debounce(equalizeHeights, 150);

// Run equalizeHeights when the DOM is ready.
if (
	document.readyState === "complete" ||
	document.readyState === "interactive"
) {
	equalizeHeights();
} else {
	document.addEventListener("DOMContentLoaded", equalizeHeights);
}

// Use the debounced function on window resize.
window.addEventListener("resize", debouncedEqualizeHeights);

export default equalizeHeights;
