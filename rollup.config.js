import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const transformStyles = postcss({
  extract: 'dist/aos.css',
  plugins: [
    autoprefixer
  ]
});

const input = 'src/js/aos.js';

export default [
	{
		input,
		output: {
      file: pkg.browser,
      name: 'AOS',
      format: 'umd',
    },
		plugins: [
      transformStyles,
      resolve(),
			commonjs(),
			babel({
        exclude: ['node_modules/**']
      }),
		],
	},
	{
		input,
		external: Object.keys(pkg.dependencies),
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' },
		],
		plugins: [
      transformStyles,
			babel({
				exclude: ['node_modules/**']
			}),
		],
	},
];
