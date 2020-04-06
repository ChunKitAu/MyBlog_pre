var pageno = 1;
$(function () {

    initBlog(pageno);
    InitTypeList();
    InitTagsList();
    InitRecommend();
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop(),scrollHeight = $(document).height(),windowHeight = $(this).height();
        var positionValue = (scrollTop + windowHeight) - scrollHeight;
        if (positionValue >= -C) {
            if (pageno <=  totalPages ) {
                pageno++;
                initBlog(pageno);
            } else {
                $("#bottmText").show();
            }
        }
    });
});
//初始化右边分类信息
function InitTypeList() {
    $.ajax({
        url:myhost+"/blog/type/list",
        dataType:"JSON",
        type: "GET",
        contentType : "application/json;charset-UTF-8",
        crossDomain: true,
        data:JSON.stringify({
            "page":1,
            "size":10
        }),
        success: function (result) {
            if(result.status == 200){
                var contents = result.data;
                $("#type").empty();

                $.each(contents,function (index,item) {
                    if(item.num != 0){
                        var a = document.createElement('a');
                        a.innerText = item.name;
                        a.setAttribute("onclick","toTypeHref("+item.id+")");
                        a.href = "#";
                        a.setAttribute("class","item");

                        var div = document.createElement('div');
                        div.append(item.num);
                        div.setAttribute("class","ui teal basic left pointing label")

                        a.appendChild(div);
                        $("#type").append(a);
                    }

                })
            }
        },
        error: function () {

        }
    })
}

function InitTagsList() {
    $.ajax({
        url:myhost+"/blog/tag/list",
        dataType:"JSON",
        type: "GET",
        contentType : "application/json;charset-UTF-8",
        crossDomain: true,
        data:JSON.stringify({
            "page":1,
            "size":10
        }),

        // <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-thiny">
        // 学习方法
        // <div class="detail">12</div>
        // </a>
        success: function (result) {
            if(result.status == 200){
                var contents = result.data;
                $("#tagContent").empty();

                $.each(contents,function (index,item) {
                    if(item.num != 0){
                        var a = document.createElement('a');
                        a.innerText = item.name;
                        a.setAttribute("onclick","toTagHref("+item.id+")");
                        a.href = "#";
                        a.setAttribute("class","ui teal basic left pointing m-margin-top-small label ");

                        var div = document.createElement('div');
                        div.append(item.num);
                        div.setAttribute("class","detail")

                        a.appendChild(div);
                        $("#tagContent").append(a);
                    }


                })
            }
        },
        error: function () {

        }
    })
}

function InitRecommend() {
    $.ajax({
        url:myhost+"/blog/article/recommend/list",
        dataType:"JSON",
        type: "GET",
        contentType : "application/json;charset-UTF-8",
        crossDomain: true,
        success: function (result) {
            if(result.status == 200){
                var contents = result.data;
                $("#commendContent").empty();
                // <div class="ui secondary segment">
                // <i class="bookmark icon"></i>最新推荐
                // </div>
                var d = document.createElement('div');
                d.setAttribute("class","ui secondary segment");
                var i =document.createElement('i');
                i.setAttribute("class","bookmark icon");
                d.appendChild(i);
                d.append("最新推荐");
                $("#commendContent").append(d);
                // <div class="ui segment ">
                // <a href="#" target="_blank" class="m-black m-text-thin">阿斯顿你</a>
                // </div>
                $.each(contents,function (index,item) {
                    var div = document.createElement('div');
                    div.setAttribute("class","ui segment");

                    var a = document.createElement('a');
                    a.innerText = item.title;
                    a.setAttribute("onclick","toBlogHref("+item.id+")");
                    a.href = "#";
                    a.setAttribute("class","m-black m-text-thin");

                    div.appendChild(a);
                    $("#commendContent").append(div);

                })
            }
        },
        error: function () {

        }
    })
}

function initBlog(page) {
    $.ajax({
        url:myhost+"/blog/article/list",
        dataType:"JSON",
        type: "GET",
        contentType : "application/json;charset-UTF-8",
        crossDomain: true,
        data:{
            "page":page,
            "size":10,
        },
        async:false,
        success: function (result) {
            if(result.status == 200){
                var contents = result.data;
                totalPages = result.data[0].totalPgae;
                Blog("blogContent",contents);
            }
        },
        error: function (result) {
            if(result.responseJSON.status == 500){

            }
        }
    })
}


