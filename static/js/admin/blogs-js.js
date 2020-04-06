var totalPgae = 0,currentPage = 1;
$(function () {
    initTable();
    InitSearchType();
})

function initTable() {
    $("#table_boby").empty();
    $.ajax({
        url: myhost + "/blog/article/list",
        type: "GET",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        data: {
            "size": 10,
            "page": currentPage,
        },
        success: function (result) {
            var table = document.getElementById("table_boby");
            totalPgae = result.data[0].totalPgae;
            $.each(result.data,function (index,item) {
                var tr = document.createElement("tr");
                var indexTd = document.createElement("td");
                indexTd.append(index+1);

                var titleTd = document.createElement("td");
                titleTd.append(item.title);

                var createTimeTd = document.createElement("td");
                createTimeTd.append(item.createTime);

                var statusTd = document.createElement("td");
                if(item.status == 1){
                    statusTd.append("发布");
                }else{
                    statusTd.append("保存");
                }

                var doTd = document.createElement("td");
                var editBtn = document.createElement("a");
                editBtn.setAttribute("class","ui mini teal basic button");
                editBtn.href = "#";
                editBtn.innerText = "编辑";
                editBtn.setAttribute("onclick","toBlogInput("+item.id+")")
                var delBtn = document.createElement("a");
                delBtn.setAttribute("class","ui mini red basic button");
                delBtn.href = "#";
                delBtn.innerText = "删除";
                delBtn.setAttribute("onclick","deleteBlog("+item.id+")")
                doTd.append(editBtn);
                doTd.append(delBtn);

                tr.append(indexTd);
                tr.append(titleTd);
                tr.append(createTimeTd);
                tr.append(statusTd);
                tr.append(doTd);

                table.append(tr);
            })

            initPage();
        }
    })
}
function InitSearchType(){
    $.ajax({
        url: myhost + "/blog/type/list",
        type: "GET",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        data: {
            "size": 20,
            "page": 1,
        },
        success: function (result) {
            $.each(result.data,function (index,item) {
                var div = document.createElement("div");
                div.setAttribute("class","item");
                div.setAttribute("data-value",item.id);
                div.append(item.name);
                $("#searchTypeMenu").append(div);
            })
        }
    })
}
//表单分页
function initPage() {
    $("#tfoot").empty();
    //分页条
    var tfoot = document.getElementById("tfoot");
    //<
    var pre_a = document.createElement("a");
    if(currentPage == 1){
        pre_a.setAttribute("class","disabled icon item");
    }else {
        pre_a.setAttribute("class","icon item");
    }
    var pre_a_i = document.createElement("i");
    pre_a_i.setAttribute("class","left chevron icon");
    pre_a.appendChild(pre_a_i);
    pre_a.setAttribute("onclick","tablePage("+1+")");
    tfoot.append(pre_a);

    if(totalPgae > 5){
        for(var i =currentPage,end = totalPgae>5?5:totalPgae;i <= end;i++){
            var a = document.createElement("a");
            if(i <= currentPage+2){
                if(currentPage == i){
                    a.setAttribute("class","disabled item");
                }else {
                    a.setAttribute("class","item");
                }
                a.append(i);
                a.setAttribute("onclick","tablePage("+i+")");
            }
            if(i == currentPage+2){
                a.setAttribute("class","disabled item");
                a.append("...");
            }
            if(i > currentPage+2){
                a.setAttribute("class","item");
                a.append(totalPgae -  5 + i);
                a.setAttribute("onclick","tablePage("+totalPgae -  5 + i+")");
            }
            tfoot.append(a);
        }
    }else {
        for(var i =1 ;i <= totalPgae;i++){
            var a = document.createElement("a");
            if(currentPage == i){
                a.setAttribute("class","disabled item");
            }else {
                a.setAttribute("class","item");
            }
            a.append(i);
            a.setAttribute("onclick","tablePage("+i+")");
            tfoot.append(a);
        }
    }

    //>
    var next_a = document.createElement("a");
    if(currentPage == totalPgae){
        next_a.setAttribute("class","disabled icon item");
    }else {
        next_a.setAttribute("class","icon item");
    }
    var next_a_i = document.createElement("i");
    next_a_i.setAttribute("class","right chevron icon");
    next_a.appendChild(next_a_i);
    next_a.setAttribute("onclick","tablePage("+totalPgae+")");
    tfoot.append(next_a);
}


function tablePage(page) {
    currentPage = page
    initTable();
}

function toBlogInput(blogId) {
    sessionStorage.setItem("blogId",blogId);
    window.location.href = "blogs-input.html"
}
function deleteBlog(blogId) {
    if(blogId == null)
        return ;
    if(confirm("确认删除？")){
        $.ajax({
            url: myhost + "/blog/article/"+blogId,
            dataType: "JSON",
            type: "DELETE",
            contentType: "application/json;charset-UTF-8",
            crossDomain: true,
            headers : {'Authorization':token},
            success: function (result) {
                if(result.status == 200){
                    alert("删除成功！");
                    window.location.reload();
                }
            }
        })
    }
}

function Search() {
    var title = $("#searchTitle").val();
    var type = document.getElementById("searchTypeMenuValue").getAttribute("value");
    var recommend = document.getElementById("searchRecommend").checked;

    console.log(title+type+recommend);
    $.ajax({
        url: myhost + "/blog/article/admin/like",
        dataType: "JSON",
        type: "GET",
        contentType: "application/json;charset-UTF-8",
        crossDomain: true,
        headers : {'Authorization':token},
        data: {
            title : title,
            recommend : recommend,
            typeId : type
        },
        success: function (result) {
            if(result.status == 200){
                $("#table_boby").empty();
                var table = document.getElementById("table_boby");
                totalPgae = result.data[0].totalPgae;
                $.each(result.data,function (index,item) {
                    var tr = document.createElement("tr");
                    var indexTd = document.createElement("td");
                    indexTd.append(index+1);

                    var titleTd = document.createElement("td");
                    titleTd.append(item.title);

                    var createTimeTd = document.createElement("td");
                    createTimeTd.append(item.createTime);

                    var statusTd = document.createElement("td");
                    if(item.status == true){
                        statusTd.append("发布");
                    }else{
                        statusTd.append("保存");
                    }

                    var doTd = document.createElement("td");
                    var editBtn = document.createElement("a");
                    editBtn.setAttribute("class","ui mini teal basic button");
                    editBtn.href = "#";
                    editBtn.innerText = "编辑";
                    editBtn.setAttribute("onclick","toBlogInput("+item.id+")")
                    var delBtn = document.createElement("a");
                    delBtn.setAttribute("class","ui mini red basic button");
                    delBtn.href = "#";
                    delBtn.innerText = "删除";
                    delBtn.setAttribute("onclick","deleteBlog("+item.id+")")
                    doTd.append(editBtn);
                    doTd.append(delBtn);

                    tr.append(indexTd);
                    tr.append(titleTd);
                    tr.append(createTimeTd);
                    tr.append(statusTd);
                    tr.append(doTd);


                    table.append(tr);
                });
                $("#tfoot").empty();
                // initPage();
            }
        }
    })
}
