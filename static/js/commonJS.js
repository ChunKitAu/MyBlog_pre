var myhost = "http://127.0.0.1:8086";

var totalPages  = 0 ;//总页数
var C = 10;//滚动条距离底部的距离
var parentCommentId = null;
var blogKeyword = null;

$('.menu.toggle').click(function () {
    $('.m-item').toggleClass('m-mobile-hide');
});


