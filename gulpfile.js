'use strict';

//npm i --save-dev gulp gulp-watch gulp-autoprefixer gulp-uglify gulp-less gulp-sourcemaps gulp-rigger gulp-minify-css gulp-csscomb gulp-imagemin imagemin-pngquant browser-sync rimraf gulp-svgo gulp-typograf gulp-merge-media-queries

const   gulp = require('gulp'),
        watch = require('gulp-watch'),
        autoprefixer = require('gulp-autoprefixer'),
        uglify = require('gulp-uglify'),
        less = require('gulp-less'),
        sourcemaps = require('gulp-sourcemaps'),
        rigger = require('gulp-rigger'),
        cssmin = require('gulp-minify-css'),
        csscomb = require('gulp-csscomb'),
        imagemin = require('gulp-imagemin'),
        pngquant = require('imagemin-pngquant'),
        browserSync = require("browser-sync"),
        svgo = require('gulp-svgo'),
        typograf = require('gulp-typograf'),
        rimraf = require('rimraf'),
        mmq = require('gulp-merge-media-queries'),
        path = require('path'),
        reload = browserSync.reload;

var route = {
    build: {
        html: 'web/',
        js: 'web/js/',
        libs: 'web/js/libs',
        css: 'web/css/',
        img: 'web/img/',
        svg: 'web/img/svg',
        fonts: 'web/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        libs: 'src/js/libs/**/*.*',
        style: 'src/less/main.less',
        img: 'src/img/**/*.*',
        svg: 'src/img/svg/*.svg',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.*',
        libs: 'src/js/libs/**/*.*',
        style: 'src/less/**/*.less',
        img: 'src/img/**/*.*',
        svg: 'src/img/svg/*.svg',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './web'
};

var config = {
    server: {
        baseDir: "./web"
    },
    tunnel: false,
    host: 'localhost',
    port: 9005,
    logPrefix: "dev"
};

gulp.task('server', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(route.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(route.src.html)
        .pipe(rigger())
        .pipe(typograf({locale: ['ru', 'en-US']}))
        .pipe(gulp.dest(route.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(route.src.style)
        //.pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(csscomb())
        .pipe(mmq({
            log: true
        }))
        //.pipe(cssmin())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(route.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(route.src.js)
        .pipe(rigger())
        //.pipe(sourcemaps.init())
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(route.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(route.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(route.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('svg:build', function () {
    gulp.src(route.src.svg)
        .pipe(svgo())
        .pipe(gulp.dest(route.build.svg))
        .pipe(reload({stream: true}));
});

gulp.task('libs:build', function() {
    return gulp.src(route.src.libs)
        .pipe(gulp.dest(route.build.libs))
});

gulp.task('fonts:build', function() {
    gulp.src(route.src.fonts)
        .pipe(gulp.dest(route.build.fonts))
});

gulp.task('build', [
    'html:build',
    'style:build',
    'image:build',
    'svg:build',
    'js:build',
    'libs:build',
    'fonts:build'
]);

gulp.task('watch', function(){
    watch([route.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([route.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([route.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([route.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([route.watch.svg], function(event, cb) {
        gulp.start('svg:build');
    });
    watch([route.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([route.watch.libs], function(event, cb) {
        gulp.start('libs:build');
    });
});


gulp.task('default', ['build', 'server', 'watch']);