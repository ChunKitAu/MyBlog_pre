$("#header").load("admin_template.html #header",function () {
    var loginUser = sessionStorage.getItem("user");
    user = loginUser.split(",");
    $("#avatar").src = user[1];
    document.getElementById("pubilc_userName").append(user[2]);

    $('.menu.toggle').click(function () {
        $('.m-item').toggleClass('m-mobile-hide');
    });
    $('.ui.dropdown').dropdown({
        on : 'hover'
    });

    var path = window.location.pathname;
    var pathName = path.substring(path.lastIndexOf("/")+1,path.length);
    switch (pathName) {
        case "index.html":
            $("#indexA").attr("class","m-item item m-mobile-hide active");break;
        case "blogs.html":
            $("#blogA").attr("class","m-item item m-mobile-hide active");break;
        case "types.html":
            $("#typeA").attr("class","m-item item m-mobile-hide active");break;
        case "tags.html":
            $("#tagA").attr("class","m-item item m-mobile-hide active");break;
    }
});