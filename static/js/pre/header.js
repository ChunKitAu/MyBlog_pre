$("#header").load("../pre/template.html #header",function () {
    $("#searchI").attr("onclick","  sessionStorage.setItem(\"blogKeyword\",$(\"#query\").val());  window.location.href = \"search.html\" " );

    $('.menu.toggle').click(function () {
        $('.m-item').toggleClass('m-mobile-hide');
    });
    $('.ui.dropdown').dropdown({
        on : 'hover'
    });
    //导航栏固定
    // fix main menu to page on passing
    $('.main.menu').visibility({
        type: 'fixed'
    });
    // show dropdown on hover
    $('.main.menu  .ui.dropdown').dropdown({
        on: 'hover'
    });
    var path = window.location.pathname;
    var pathName = path.substring(path.lastIndexOf("/")+1,path.length);
    switch (pathName) {
        case "index.html":
            $("#indexA").attr("class","m-item item m-mobile-hide active");break;
        case "tags.html":
            $("#tagsA").attr("class","m-item item m-mobile-hide active");break;
        case "type.html":
            $("#typeA").attr("class","m-item item m-mobile-hide active");break;
        case "about.html":
            $("#aboutA").attr("class","m-item item m-mobile-hide active");break;
    }
});

