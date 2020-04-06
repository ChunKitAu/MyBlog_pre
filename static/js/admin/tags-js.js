var exitTag ;
$(function () {
    InitTagHeader();
})


function InitTagHeader() {
    $.ajax({
        url:myhost+"/blog/tag/list",
        type: "GET",
        crossDomain: true,
        contentType : "application/json",
        dataType:"json",
        async:false,
        data:JSON.stringify({
            "size":50,
            "page":1,
        }),
        success: function (result) {
            $('#tags').empty();
            var contents = result.data;
            exitTag = new Array();

            $.each(contents,function (index,item) {
                var a = document.createElement("a");
                // a.setAttribute("onclick","toTagHref("+item.id+")");
                exitTag[index] = item.name;
                a.append(item.name);
                var div = document.createElement("div");
                a.setAttribute("class","ui teal basic left pointing large label m-margin-top-small ");
                div.setAttribute("class","detail");
                div.append(item.num);

                var i = document.createElement("i");
                i.setAttribute("class","red close icon");
                i.setAttribute("onclick","deleteTag("+item.id+")");

                a.appendChild(div);
                a.appendChild(i);
                $('#tags').append(a);
            })
        },
        error: function (result) {
        }
    })
}


function openPostDiv() {
    $("#opstDiv").show();
    $("#addBtn").attr("style","display : none");

}

function postTag(){
    var name = $("#input").val();
    if (name.length  == 0){
        $("#message").empty();
        $("#message").append("标签名不能为空");
        $("#messageDiv").show();
        return ;
    }
    if(exitTag.indexOf(name) != -1){
        $("#message").empty();
        $("#message").append(name+"已经存在");
        $("#messageDiv").show();
        return ;
    }

    $.ajax({
        url: myhost + "/blog/tag",
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

function deleteTag(deleteId) {
    if(confirm("是否删除")){
        $.ajax({
            url: myhost + "/blog/tag/"+deleteId,
            type: "DELETE",
            headers : {'Authorization':token},
            crossDomain: true,
            contentType: "application/json",
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