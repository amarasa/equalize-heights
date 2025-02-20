// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
	input: "src/runtime.js",
	output: {
		file: "dist/equalizeHeights.js",
		format: "esm",
		sourcemap: false,
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({
			babelHelpers: "bundled",
			exclude: "node_modules/**",
			presets: [
				[
					"@babel/preset-env",
					{
						targets: "> 0.25%, not dead",
						useBuiltIns: "entry",
						corejs: 3,
					},
				],
			],
		}),
	],
};
