const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addBase }) {
	// This registers any class starting with "eh-"
	// as a base style. It doesn’t output any actual CSS,
	// but it prevents these classes from being purged.
	addBase({
		'[class^="eh-"]': {
			/* Optionally, you can add custom properties here
         that your runtime JS might use, but for now
         this acts as a marker class. */
		},
	});
});
