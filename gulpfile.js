var gulp = require('gulp'),
    gulp_less = require('gulp-less'),
    gulp_connect = require('gulp-connect'),
    gulp_minify_css = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css');

//在一个任务中【执行多个任务】
gulp.task('serves', function () {
    //创建一个服务器，端口默认是8080
    gulp_connect.server({
        //root：根目录
        root: 'public',
        livereload: true
    });
    //动态监听
    gulp.watch('public/less/*.less', ['reload', 'less']);
});
//部署动作命令-reload
gulp.task('reload', function () {
    gulp.src('public/less/*.less')
        .pipe(gulp_connect.reload());
});
//部署动作-less
gulp.task('less', function () {
    gulp.src('public/less/*.less')
        .pipe(gulp_less())
        .pipe(gulp_minify_css())
        .pipe(gulp.dest('public/stylesheets'))
});

gulp.task('script', function () {
    gulp.src(['public/js/myE&Q.js','public/js/lc_date.js','public/js/login.js','public/js/login&regist.js',
    'public/js/myAjax.js','public/js/order.js','public/js/pay.js','public/js/personal.js',
    'public/js/productDetails.js','public/js/regist.js','public/js/shoppingCart.js',
    'public/js/bootstrap.js','public/js/contactUs.js','public/js/customization.js','public/js/dressInformation.js'])
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'))
})//由于gulp不能压缩es6代码，所以有些文件会报错，但是又内有入口文件，不好改为webpack的，所以只压缩了部分文件
gulp.task('style', function () {
    gulp.src('public/stylesheets/font-awesome.min.css')
    .pipe(cssmin())
    .pipe(gulp.dest('public/stylesheets1'));
});

gulp.task('default', ['serves', 'reload', 'less']); //定义默认任务