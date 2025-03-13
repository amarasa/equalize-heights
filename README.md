# Equalize Heights

**Equalize Heights** is a Tailwind CSS plugin that automatically equalizes the heights of elements that share a marker—either a class starting with `eh-` or a data attribute (e.g., `data-equalize="groupName"`). It works out of the box—just add the plugin to your Tailwind config, install the package, and import the runtime module in your JavaScript entry file.

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

    To enable the automatic equalization, you must import the runtime module in your main JavaScript entry file. **If you want to apply equalization only at specific breakpoints**, you can set options on the `window` object **before** importing the runtime. For example:

    ```js
    // Set the options first – in this example, equalization is applied only for viewports 768px and wider.
    window.equalizeHeightsOptions = { minWidth: 768 };

    // Then import the runtime module
    import "equalize-heights/runtime";
    ```

    If you do not need a breakpoint, simply import the runtime:

    ```js
    import "equalize-heights/runtime";
    ```

    This single import ensures that the runtime code (which automatically equalizes heights on page load and on window resize) is loaded into your project.

---

## Usage

Once installed and configured, mark your HTML elements with either a class starting with `eh-` or a data attribute to define the group. For example:

### Using Class-Based Grouping

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

### Using Data Attribute Grouping

You can also use a data attribute for grouping. For example, to equalize the heights of product card content:

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

In both cases, all elements sharing the same group key (either via a class like `eh-members` or via a data attribute such as `data-equalize="product-card"`) will have their heights equalized automatically when the viewport meets your specified breakpoint (if any) or unconditionally if no breakpoint is set.

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
3. **Optionally, set a breakpoint:**  
   In your main JS file, before importing the runtime, add:
    ```js
    window.equalizeHeightsOptions = { minWidth: 768 };
    ```
4. Import the runtime module in your main JS file:
    ```js
    import "equalize-heights/runtime";
    ```
5. Mark your HTML elements with either a class (e.g., `eh-members`) or a data attribute (e.g., `data-equalize="groupName"`).

**Q: How does Equalize Heights work?**  
A: The runtime module automatically adjusts the heights of all elements within the same group (defined either by a class or a data attribute) by matching them to the tallest element in that group. It runs on DOM load and on window resize (using debouncing to improve performance) and respects any breakpoint settings you configure.

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

-   Ensure your HTML elements include the correct grouping markers (either classes like `eh-members` or data attributes like `data-equalize="groupName"`).
-   Verify that the runtime module is imported early in your JS entry file.
-   If using a breakpoint, confirm that `window.equalizeHeightsOptions` is set **before** the runtime is imported.
-   Check the browser console for any JavaScript errors that might be interfering with execution.

---

## Summary

Using **Equalize Heights** is as simple as:

1. **Add the plugin** to your Tailwind configuration.
2. **Install the package** with npm.
3. **Optionally, set breakpoint options:**
    ```js
    window.equalizeHeightsOptions = { minWidth: 768 };
    ```
4. **Import the runtime** module in your main JavaScript file:
    ```js
    import "equalize-heights/runtime";
    ```
5. **Mark your HTML elements** with classes like `eh-members` or data attributes like `data-equalize="groupName"`.

That’s it—your elements will automatically be equalized in height when the viewport meets your specified breakpoint (or unconditionally if no breakpoint is set)!

Enjoy a consistent, professional layout with Equalize Heights!
