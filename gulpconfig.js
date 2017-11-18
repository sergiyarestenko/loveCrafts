'use strict';
const os = require('os');
const browser = os.platform() === 'linux' ? 'google-chrome' : (os.platform() === 'darwin' ? 'google chrome' : (os.platform() === 'win32' ?  'firefox' : 'chrome' ));

module.exports = {
	port: 8000,
	browser: browser,
	paths: {
		src: './src',
		build: './build',
		html: './src/index.html',
		less:'./src/stylesheets/**.less',
		js: './src/js/**.js',
		img: './src/img/**/*.*'
	},
	browserSync: {
		proxy: 'http://localhost:8000/index.html',
		files: ['build/**/*.*'],
		browser: browser,
		port: 8001
	}
};
