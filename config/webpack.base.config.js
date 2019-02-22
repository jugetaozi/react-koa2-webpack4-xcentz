'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

// const prodMode = process.env.NODE_ENV === 'production';

const srcResolve = function (file) {
	if (file) {
		return path.join(__dirname, '..', 'src', file);
	} else {
		return path.join(__dirname, '..', 'src');
	}
};

const distResolve = function (file) {
	return path.join(__dirname, '..', 'build', 'static', file);
};

module.exports = {
	entry: {
		index: srcResolve('index.js'),
		admin: srcResolve('admin.js'),
	},
	output: {
		path: distResolve(''),
		filename: 'js/[name].js',
	},
	module: {
		rules: [
			// {
			//   test: /\.(js|jsx|mjs)$/,
			//   enforce: 'pre',
			//   use: [
			//     {
			//       options: {
			//         formatter: eslintFormatter,
			//         eslintPath: require.resolve('eslint'),

			//       },
			//       loader: require.resolve('eslint-loader'),
			//     },
			//   ],
			//   include: srcResolve(),
			// },
			{
				test: /\.(js|jsx|mjs)$/,
				include: srcResolve(),
				loader: require.resolve('babel-loader'),
				//不能再这里加option 否则会覆盖.babelrc
			},
			{
				// "oneOf" will traverse all following loaders until one will
				// match the requirements. When no loader matches it will fall
				// back to the "file" loader at the end of the loader list.
				oneOf: [
					// "url" loader works like "file" loader except that it embeds assets
					// smaller than specified limit in bytes as data URLs to avoid requests.
					// A missing `test` is equivalent to a match.
					{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},
					{
						test: /\.(css|less)$/,
						include: srcResolve(),
						use: [
							require.resolve('style-loader'),
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
									modules: true, //开启css 模块化
									localIdentName: '[path][name]__[local]--[hash:base64:5]',
								},
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									// Necessary for external CSS imports to work
									// https://github.com/facebookincubator/create-react-app/issues/2677
									ident: 'postcss',
									plugins: () => [
										require('postcss-flexbugs-fixes'),
										autoprefixer({
											browsers: [
												'>1%',
												'last 4 versions',
												'Firefox ESR',
												'not ie < 9', // React doesn't support IE8 anyway
											],
											flexbox: 'no-2009',
										}),
									],
								},
							},
							{
								loader: require.resolve('less-loader'),
								options: {javascriptEnabled: true},
							},
						],
					},
					{
						test: /\.(css|less)$/,
						exclude: srcResolve(),
						use: [
							require.resolve('style-loader'),
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
									// modules: true,//开启css 模块化
									// localIdentName: '[path][name]__[local]--[hash:base64:5]'
								},
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									// Necessary for external CSS imports to work
									// https://github.com/facebookincubator/create-react-app/issues/2677
									ident: 'postcss',
									plugins: () => [
										require('postcss-flexbugs-fixes'),
										autoprefixer({
											browsers: [
												'>1%',
												'last 4 versions',
												'Firefox ESR',
												'not ie < 9', // React doesn't support IE8 anyway
											],
											flexbox: 'no-2009',
										}),
									],
								},
							},
							{
								loader: require.resolve('less-loader'),
								options: {javascriptEnabled: true},
							},
						],
					},
					// "file" loader makes sure those assets get served by WebpackDevServer.
					// When you `import` an asset, you get its (virtual) filename.
					// In production, they would get copied to the `build` folder.
					// This loader doesn't use a "test" so it will catch all modules
					// that fall through the other loaders.
					{
						// Exclude `js` files to keep "css" loader working as it injects
						// its runtime that would otherwise processed through "file" loader.
						// Also exclude `html` and `json` extensions so they get processed
						// by webpacks internal loaders.
						exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
						loader: require.resolve('file-loader'),
						options: {
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},
				],
			},
			// ** STOP ** Are you adding a new loader?
			// Make sure to add the new loader(s) before the "file" loader.
		],
	},
	resolve: {
		// modules: ['node_modules', paths.appNodeModules].concat(
		//   process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
		// ),
		// extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
		alias: {
			'react-native': 'react-native-web',
			utils: path.resolve(__dirname, '../src/utils'),
			api: path.resolve(__dirname, '../src/api'),
			assets: path.resolve(__dirname, '../src/assets'),
			components: path.resolve(__dirname, '../src/components'),
			layouts: path.resolve(__dirname, '../src/layouts'),
			pages: path.resolve(__dirname, '../src/pages'),
			router: path.resolve(__dirname, '../src/router'),
		},
		// plugins: [
		//   new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
		// ],
	},
	plugins: [
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
}