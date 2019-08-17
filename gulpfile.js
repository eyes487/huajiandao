var gulp=require('gulp'),
gulp_less=require('gulp-less'),
gulp_connect=require('gulp-connect'),
gulp_minify_css=require('gulp-minify-css');

//在一个任务中【执行多个任务】
gulp.task('serves',function () {
//创建一个服务器，端口默认是8080
gulp_connect.server({
    //root：根目录
    root:'public',
    livereload:true
});
//动态监听
gulp.watch('public/less/*.less',['reload','less']);
});
//部署动作命令-reload
gulp.task('reload',function () {
gulp.src('public/less/*.less')
    .pipe(gulp_connect.reload());
});
//部署动作-less
gulp.task('less',function () {
gulp.src('public/less/*.less')
    .pipe(gulp_less())
    .pipe(gulp_minify_css())
    .pipe(gulp.dest('public/stylesheets'))
});
gulp.task('default',['serves','reload','less']); //定义默认任务

