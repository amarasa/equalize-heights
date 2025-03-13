# Equalize Heights

**Equalize Heights** is a Tailwind CSS plugin that automatically equalizes the heights of elements that share a marker—either a class starting with `eh-` or a data attribute (e.g., `data-equalize="groupName"`). It works out of the box—just add the plugin to your Tailwind config, install the package, and import the runtime module in your JavaScript entry file.

With advanced breakpoint control, you can define multiple viewport ranges and specify whether to apply equalization or reset the heights.

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

    To enable automatic equalization, import the runtime module in your main JavaScript entry file. **If you want to apply equalization only at specific breakpoints,** set options on the `window` object **before** importing the runtime. For example:

    ```js
    // Set advanced breakpoint options first.
    // In this example:
    // - For viewports 1024px and wider, equalize heights.
    // - For viewports between 768px and 1023px, reset heights (no equalization).
    window.equalizeHeightsOptions = {
    	breakpoints: [
    		{ min: 1024, action: "equalize" },
    		{ min: 768, max: 1023, action: "reset" },
    	],
    };

    // Then import the runtime module
    import "equalize-heights/runtime";
    ```

    If you do not need breakpoints, simply import the runtime:

    ```js
    import "equalize-heights/runtime";
    ```

    This ensures the runtime code (which automatically equalizes heights on page load and on window resize) is loaded into your project.

---

## Usage

Mark your HTML elements with either a class (e.g., `eh-members`) or a data attribute (e.g., `data-equalize="groupName"`) to define the grouping for equalization.

### Example using Class-Based Grouping

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

### Example using Data Attribute Grouping

```html
<div class="col-span-12 lg:col-span-4 mb-8">
	<a
		class="product-card !text-[#474747] bottom-0 duration-300 ease-in-out hover:bottom-2 transition-all relative"
		href="<?php the_permalink(); ?>"
	>
		<div
			class="product-card-feature-image rounded-t-lg pb-[70%] !bg-cover !bg-center"
			style="background: url(<?php $feature_image = wp_get_attachment_image_url(get_post_thumbnail_id($post), 'large'); echo $feature_image; ?>);"
		></div>
		<div
			data-equalize="product-card"
			class="product-card-content px-10 py-8 border-solid border-[#C6C6CD] border-[1px] rounded-b-lg"
		>
			<div class="product-card-headline">
				<h3 class="text-2xl text-secondary"><?php the_title(); ?></h3>
			</div>
			<div class="product-card-excerpt mb-5"><?php the_excerpt(); ?></div>
			<div class="flex justify-between items-center">
				<div class="learn-more text-primary font-bold text-lg">
					Learn more
				</div>
				<div class="learn-more-arrow">
					<i class="fa fa-arrow-right text-primary"></i>
				</div>
			</div>
		</div>
	</a>
</div>
```

In both cases, all elements in the same group will have their heights equalized automatically when the viewport meets the conditions specified by your breakpoint settings (or unconditionally if no breakpoints are set).

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
3. **Optionally, set advanced breakpoint options:**  
   In your main JS file, before importing the runtime, add:
    ```js
    window.equalizeHeightsOptions = {
    	breakpoints: [
    		{ min: 1024, action: "equalize" },
    		{ min: 768, max: 1023, action: "reset" },
    	],
    };
    ```
4. Import the runtime module in your main JS file:
    ```js
    import "equalize-heights/runtime";
    ```
5. Mark your HTML elements with classes (e.g., `eh-members`) or data attributes (e.g., `data-equalize="groupName"`).

**Q: How does Equalize Heights work?**  
A: The runtime module automatically adjusts the heights of all elements within the same group (as defined by a class or a data attribute) by matching them to the tallest element in that group. It runs on DOM load and on window resize (using debouncing for smoother performance) and respects any advanced breakpoint settings you configure.

**Q: Can I manually trigger the height equalization?**  
A: Yes! The runtime module exports the equalization function. To trigger it manually:

```js
import equalizeHeights from "equalize-heights/runtime";
equalizeHeights();
```

**Q: Do I need to install any extra polyfills or dependencies?**  
A: No. The runtime module is pre-bundled and self-contained, so you don't have to install `core-js` or any other polyfills separately.

**Q: My layout isn’t adjusting correctly. What should I check?**  
A:

-   Ensure your HTML elements include the correct grouping markers (either classes like `eh-members` or data attributes like `data-equalize="groupName"`).
-   Verify that the runtime module is imported early in your JS entry file.
-   If using breakpoints, confirm that `window.equalizeHeightsOptions` is set **before** the runtime is imported.
-   Check the browser console for any JavaScript errors or log output to diagnose the issue.

---

## Summary

Using **Equalize Heights** with advanced breakpoints is as simple as:

1. **Add the plugin** to your Tailwind configuration.
2. **Install the package** with npm.
3. **Optionally, set advanced breakpoint options:**
    ```js
    window.equalizeHeightsOptions = {
    	breakpoints: [
    		{ min: 1024, action: "equalize" },
    		{ min: 768, max: 1023, action: "reset" },
    	],
    };
    ```
4. **Import the runtime** module in your main JavaScript file:
    ```js
    import "equalize-heights/runtime";
    ```
5. **Mark your HTML elements** with classes like `eh-members` or data attributes like `data-equalize="groupName"`.

That’s it—your elements will automatically be equalized in height according to your advanced breakpoint settings!

Enjoy a consistent, professional layout with Equalize Heights!
