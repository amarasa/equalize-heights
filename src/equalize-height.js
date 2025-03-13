// equalize-heights.js

const plugin = require(require.resolve("tailwindcss/plugin", {
	paths: [process.cwd()],
}));

module.exports = plugin(function ({ addBase }) {
	addBase({
		'[class^="eh-"], [data-equalize]': {
			transition: "height 0.2s ease-out",
		},
	});
});
