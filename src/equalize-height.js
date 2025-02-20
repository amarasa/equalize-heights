// Ensure we’re resolving tailwindcss/plugin from the consumer’s project
const plugin = require(require.resolve("tailwindcss/plugin", {
	paths: [process.cwd()],
}));

module.exports = plugin(function ({ addBase }) {
	addBase({
		'[class^="eh-"]': {
			// Marker style: no CSS needed
		},
	});
});
