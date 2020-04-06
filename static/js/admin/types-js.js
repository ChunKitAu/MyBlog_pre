var exitType;

$(function () {
    InitTypeHeader();
})

function InitTypeHeader() {
    $.ajax({
        url: myhost + "/blog/type/list",
        dataType: "JSON",
        type: "GET",
        contentType: "application/json;charset-UTF-8",
        crossDomain: true,
        data: JSON.stringify({
            "page": 1,
            "size": 50
        }),
        async:false,
        success: function (result) {
            var types = result.data;
            $("#typeList").empty();
            exitType = new Array();
            $.each(types,function (index,item) {

                exitType[index] = item.name;

                var divtop = document.createElement('div');
                divtop.setAttribute("class","ui labeled button label m-margin-top-small");

                var a = document.createElement('a');
                // a.setAttribute("onclick","toTypeHref("+item.id+")");
                a.href="#";
                a.innerText = item.name;
                var div = document.createElement('div');
                div.append(item.num);

                a.setAttribute("class","ui teal basic  button");
                div.setAttribute("class","ui teal basic left pointing label");

                var i = document.createElement("i");
                i.setAttribute("class","large red close icon");
                i.setAttribute("onclick","deleteType("+item.id+")");
                div.appendChild(i);

                divtop.appendChild(a);
                divtop.appendChild(div);


                $("#typeList").append(divtop);

            });
        }
    });
}


function openPostDiv() {
    $("#opstDiv").show();
    $("#addBtn").attr("style","display : none");

}

function postType(){
    var name = $("#input").val();
    if (name.length  == 0){
        $("#message").empty();
        $("#message").append("标签名不能为空");
        $("#messageDiv").show();
        return ;
    }
    if(exitType.indexOf(name) != -1){
        $("#message").empty();
        $("#message").append(name+"已经存在");
        $("#messageDiv").show();
        return ;
    }

    $.ajax({
        url: myhost + "/blog/type",
        type: "POST",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        headers : {'Authorization':token},
        data: JSON.stringify({
            "name":name,
        }),
        success: function (result) {
            alert("添加成功");
            window.location.reload();
        }
    })
}

function deleteType(deleteId) {
    if(confirm("是否删除")){
        $.ajax({
            url: myhost + "/blog/type/"+deleteId,
            type: "DELETE",
            crossDomain: true,
            contentType: "application/json",
            headers : {'Authorization':token},
            dataType: "json",
            success: function (result) {
                alert("删除成功");
                window.location.reload();
            }
        })
    }
}

$('.ui.dropdown').dropdown({
    on : 'hover'
});

//消息提示关闭初始化
$('.message .close')
    .on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade');
    });