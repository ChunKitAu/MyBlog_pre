var tagId;
var pageno =1;
$(function () {
    tagId = sessionStorage.getItem("tagId");
    if(tagId != null)
        sessionStorage.removeItem("tagId");
    InitTagHeader();
    InitTagBolg();
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop(),scrollHeight = $(document).height(),windowHeight = $(this).height();
        var positionValue = (scrollTop + windowHeight) - scrollHeight;
        if (positionValue >= -C) {
            if (pageno <=  totalPages ) {
                pageno++;
                InitTagBolg(pageno);
            } else {
                $("#bottmText").show();
            }
        }
    });
})

function InitTagHeader() {
    $.ajax({
        url:myhost+"/blog/tag/list",
        type: "GET",
        crossDomain: true,
        contentType : "application/json",
        dataType:"json",
        async:false,
        data: {
            "page": 1,
            "size": 100
        },
        // <a href="#" target="_blank" class="ui basic left pointing large label m-margin-tb-thiny">
        // 学习方法
        // <div class="detail">12</div>
        // </a>
        success: function (result) {
            $('#tags').empty();
            var contents = result.data;

            if(tagId == null)
                tagId = result.data[0].id;
            $.each(contents,function (index,item) {
                if(item.num != 0){
                    var a = document.createElement("a");
                    a.setAttribute("onclick","toTagHref("+item.id+")");
                    a.append(item.name);
                    var div = document.createElement("div");
                    if(tagId != null && tagId == item.id){
                        a.setAttribute("class","ui teal basic  left pointing large label m-margin-tb-thiny");
                        div.setAttribute("class"," teal detail");
                    }else {
                        a.setAttribute("class","ui basic left pointing large label m-margin-tb-thiny");
                        div.setAttribute("class","detail");
                    }
                    div.append(item.num);
                    a.appendChild(div);
                    $('#tags').append(a);
                }
            })
        },
        error: function (result) {
        }
    })
}


function InitTagBolg() {
    $.ajax({
        url: myhost + "/blog/article/tag/list/"+tagId,
        type: "GET",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        data: {
            "page": pageno,
            "size": 10
        },
        success: function (result) {
            totalPages = result.data[0].totalPgae;
            Blog("tagBlog",result.data);
        }
    });

}
