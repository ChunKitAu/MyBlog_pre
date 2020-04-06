// var myhost = "http://127.0.0.1:8086";
var myhost = "http://120.25.237.83:8086";

var totalPages  = 0 ;//总页数
var C = 10;//滚动条距离底部的距离
var parentCommentId = null; //父级评论
var blogKeyword = null; //前台搜索关键词

$('.menu.toggle').click(function () {
    $('.m-item').toggleClass('m-mobile-hide');
});


