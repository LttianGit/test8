var gulp = require('gulp');

var server = require('gulp-webserver');

var path = require('path');

var fs = require('fs');

var url = require('url');

var data = require('./moke/img.json');

var scss = require('gulp-sass');

gulp.task('devCss', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(scss())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/index.scss', gulp.series('devCss'));
})

gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                var ext = path.extname(pathname);
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/') {
                    res.end(fs.readFileSync('./src/index.html'));
                } else if (pathname === '/api/img') {
                    res.end(JSON.stringify({ code: 0, data: data }))
                } else {
                    if (ext) {
                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                    } else {
                        res.end(JSON.stringify({ code: 0 }))
                    }
                }
            }
        }))
})

gulp.task('dev', gulp.series('devCss', 'server', 'watch'));