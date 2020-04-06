$(function () {
    var pageno =1;
    var query = sessionStorage.getItem("blogKeyword");
    InitBolg(pageno,query);
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop(),scrollHeight = $(document).height(),windowHeight = $(this).height();
        var positionValue = (scrollTop + windowHeight) - scrollHeight;
        if (positionValue >= -C) {
            if (pageno <=  totalPages ) {
                pageno++;
                InitBolg(pageno,query);
            } else {
                $("#bottmText").show();
            }
        }
    });
})

function InitBolg(pageno,query) {
    $.ajax({
        url: myhost + "/blog/article/like",
        type: "GET",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        data: {
            "keywords":query,
            "page": pageno,
            "size": 10
        },
        success: function (result) {
            totalPages = result.data[0].totalPgae;
            Blog("tagBlog",result.data);
        }
    });

}