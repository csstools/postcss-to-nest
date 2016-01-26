# CSS To Nest

<a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="80" height="80" align="right"></a>

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[CSS To Nest] transforms unnested CSS into nested CSS, following the [CSS Nesting Module] specification. This might be helpful for updating a project with a single file of legacy CSS.

```css
/* before */
.foo .bar {
	color: blue;
}

.foo .bar .pre.mon {
	color: white;
}

.foo .bar .pre {
	color: red;
}

/* after */
.foo {
	@nest & .bar {
		color: blue;

		@nest & .pre {
			color: red;

			@nest &.mon {
				color: white;
			}
		}
	}
}
```

## Usage

Add [CSS To Nest] to your build tool:

```bash
npm install postcss-to-nest --save-dev
```

#### Node

```js
require('postcss-to-nest').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [CSS To Nest] as a PostCSS plugin:

```js
postcss([
	require('postcss-to-nest')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [CSS To Nest] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
	return gulp.src('./src/*.css').pipe(
		postcss([
			require('postcss-to-nest')({ /* options */ })
		])
	).pipe(
		gulp.dest('.')
	);
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [CSS To Nest] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-to-nest')({ /* options */ })
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

[ci]:      https://travis-ci.org/jonathantneal/postcss-to-nest
[ci-img]:  https://img.shields.io/travis/jonathantneal/postcss-to-nest.svg
[npm]:     https://www.npmjs.com/package/postcss-to-nest
[npm-img]: https://img.shields.io/npm/v/postcss-to-nest.svg

[Gulp PostCSS]:  https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]:       https://github.com/postcss/postcss

[CSS Nesting Module]: https://tabatkins.github.io/specs/css-nesting/

[CSS To Nest]: https://github.com/jonathantneal/postcss-to-nest
