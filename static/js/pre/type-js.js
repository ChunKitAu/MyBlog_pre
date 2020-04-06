var typeId;
var pageno =1;
$(function () {
    typeId = sessionStorage.getItem("typeId");
    if(typeId != null)
        sessionStorage.removeItem("typeId");
    InitTypeHeader();
    InitTypeBody();
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop(),scrollHeight = $(document).height(),windowHeight = $(this).height();
        var positionValue = (scrollTop + windowHeight) - scrollHeight;
        if (positionValue >= -C) {
            if (pageno <=  totalPages ) {
                pageno++;
                InitTypeBody(pageno);
            } else {
                $("#bottmText").show();
            }
        }
    });
})

function InitTypeHeader() {
    $.ajax({
        url: myhost + "/blog/type/list",
        dataType: "JSON",
        type: "GET",
        contentType: "application/json;charset-UTF-8",
        crossDomain: true,
        data: {
            "page": 1,
            "size": 100
        },
        async:false,
        success: function (result) {
            var types = result.data;
            $("#typeList").empty();
            if(typeId == null){
                typeId = result.data[0].id;
            }
            //  <div class="ui labeled button m-margin-tb-thiny">
            //     <a href="#" class="ui basic  button">的那艘的</a>
            //     <div class="ui basic  left pointing label">24</div>
            // </div>
            $.each(types,function (index,item) {
                if(item.num != 0){
                    var divtop = document.createElement('div');
                    divtop.setAttribute("class","ui labeled button m-margin-tb-thiny");

                    var a = document.createElement('a');
                    a.setAttribute("onclick","toTypeHref("+item.id+")");
                    a.href="#";
                    a.innerText = item.name;
                    var div = document.createElement('div');
                    div.append(item.num);

                    if(typeId != null && typeId == item.id){
                        a.setAttribute("class","ui teal basic  button");
                        div.setAttribute("class","ui teal basic left pointing label");
                    }else{
                        a.setAttribute("class","ui basic  button");
                        div.setAttribute("class","ui basic  left pointing label");
                    }

                    divtop.appendChild(a);
                    divtop.appendChild(div);

                    $("#typeList").append(divtop);
                }


            });
        }
    });
}

function InitTypeBody() {
    $.ajax({
        url: myhost + "/blog/article/type/list/"+typeId,
        dataType: "JSON",
        type: "GET",
        contentType: "application/json;charset-UTF-8",
        crossDomain: true,
        data: {
            "page": pageno,
            "size": 10
        },
        success: function (result) {
            totalPages = result.data[0].totalPgae;
            Blog("typeBlog",result.data);
        }
    });
}