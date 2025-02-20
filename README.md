# Equalize Heights

**Equalize Heights** is a Tailwind CSS plugin that automatically equalizes the heights of elements that share a marker class (using the `eh-*` prefix). It works out of the box—just add the plugin to your Tailwind config, install the package, and import the runtime module in your JavaScript entry file.

---

## Installation

1. **Install the Package**

    Use npm to install the package:

    ```bash
    npm install equalize-heights
    ```

2. **Configure Tailwind**

    In your `tailwind.config.js`, add the plugin:

    ```js
    module.exports = {
    	// Your existing Tailwind configuration...
    	plugins: [
    		require("equalize-heights"),
    		// ...other plugins
    	],
    };
    ```

3. **Include the Runtime Module**

    In your main JavaScript entry file (for example, `src/index.js` or `core.js`), add the following import at the very top:

    ```js
    import "equalize-heights/runtime";
    ```

    This single import ensures that the runtime code (which automatically equalizes heights on page load and on window resize) is loaded into your project.

---

## Usage

Once installed and configured, simply mark your HTML elements with a class starting with `eh-`. For example:

```html
<div class="team grid grid-cols-1 md:grid-cols-3 gap-6">
	<div class="team-members eh-members bg-gray-50 shadow p-4">
		<img
			src="https://placehold.co/300x200"
			alt="Team Member 1"
			class="w-full mb-4"
		/>
		<p>Team Member 1's info goes here.</p>
	</div>
	<div class="team-members eh-members bg-gray-50 shadow p-4">
		<img
			src="https://placehold.co/300x250"
			alt="Team Member 2"
			class="w-full mb-4"
		/>
		<p>Team Member 2's info goes here.</p>
	</div>
	<div class="team-members eh-members bg-gray-50 shadow p-4">
		<img
			src="https://placehold.co/300x150"
			alt="Team Member 3"
			class="w-full mb-4"
		/>
		<p>Team Member 3's info goes here.</p>
	</div>
</div>
```

All elements sharing the same marker (e.g., `eh-members`) will have their heights equalized automatically.

---

## FAQs

**Q: What do I need to do to get Equalize Heights working?**  
A:

1. Install the package:
    ```bash
    npm install equalize-heights
    ```
2. Add the plugin to your Tailwind config in `tailwind.config.js`:
    ```js
    plugins: [require("equalize-heights")];
    ```
3. Import the runtime module in your main JS file:
    ```js
    import "equalize-heights/runtime";
    ```
4. Add marker classes (e.g., `eh-members`) to your HTML elements.

**Q: How does Equalize Heights work?**  
A: The runtime module automatically adjusts the heights of all elements with the same marker class by matching them to the tallest element in the group. It runs on DOM load and window resize.

**Q: Can I manually trigger the height equalization?**  
A: Yes! The runtime module exports the equalization function. If you need to trigger it manually, you can do so like this:

```js
import equalizeHeights from "equalize-heights/runtime";
equalizeHeights();
```

**Q: Do I need to install any extra polyfills or dependencies?**  
A: No. The runtime module is pre-bundled and self-contained, so you don't have to install `core-js` or any other polyfills separately.

**Q: My layout isn’t adjusting correctly. What should I check?**  
A:

-   Ensure your HTML elements include the correct marker classes (e.g., `eh-members`).
-   Verify that the runtime module is imported early in your JS entry file.
-   Check the browser console for any JavaScript errors that might be interfering with execution.

---

## Summary

Using **Equalize Heights** is as simple as:

1. **Add the plugin** to your Tailwind configuration.
2. **Install the package** with npm.
3. **Import the runtime** module in your main JavaScript file:
    ```js
    import "equalize-heights/runtime";
    ```
4. **Mark your HTML elements** with classes like `eh-members`.

That’s it—your elements will automatically be equalized in height!

Enjoy a consistent, professional layout with Equalize Heights!
