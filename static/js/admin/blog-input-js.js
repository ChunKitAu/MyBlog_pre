//初始化markdown编译器
var blogId = null;
var tagList = null;
$(function() {
    blogId =sessionStorage.getItem("blogId");
    const vditor = new Vditor('vditor', {
        //工具栏
        toolbar: ["emoji" , "headings" , "bold" , "italic" , "strike" , "line" , "quote" , "list" , "ordered-list"
            , "code" , "inline-code" , "undo" , "redo" , "upload" , "link" , "table" , "edit-mode","preview" , "fullscreen"],
        typewriterMode: true,
        placeholder: 'placeholder',
        counter: 10000,
        height: 500,
        preview: {
            hljs: {
                enable: true,
                style: "monokai",
                lineNumber: true,
            },
        },

        hint: {
            emojiPath: 'https://cdn.jsdelivr.net/npm/vditor@1.8.3/dist/images/emoji',
            emoji: {
                pray: '🙏',
                broken_heart: '💔',
                ok_hand: '👌',
                smile: '😄',
                laughing: '😆',
                smirk: '😏',
                heart_eyes: '😍',
                grin: '😁',
                stuck_out_tongue: '😛',
                expressionless: '😑',
                unamused: '😒',
                sob: '😭',
                joy: '😂',
                tired_face: '😫',
                blush: '😊',
                cry: '😢',
                fearful: '😨'
            },
        },
        tab: '\t',
        upload: {
            accept: 'image/*',
            withCredentials:true,
            url: myhost+'/blog/file/upload/img',
            success(editor,data){ //上传成功回显
                data = JSON.parse(data); //将json字符串转换成json
                let img_text = `\n![](${data.data})\n`;
                var innerHTML = editor.innerHTML;
                editor.innerHTML = innerHTML+img_text;
            },
            filename (name) {
                return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
                replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
                replace('/\\s/g', '')
            },
        },
    })


    //文章回显
    if(blogId != null){
        var tagDef = document.createElement("div");
        tagDef.setAttribute("class","default text");
        $("#tagshow").append(tagDef);
        sessionStorage.removeItem("blogId")
        sessionStorage.setItem("updatId",blogId);
        InitBlogContent();
    }else{
        //编写文章
        var typeDef = document.createElement("div");
        typeDef.setAttribute("class","default text");
        typeDef.append("分类");
        $("#typeShow").append(typeDef);

        var tagDef = document.createElement("div");
        tagDef.setAttribute("class","default text");
        tagDef.append("标签");
        $("#tagshow").append(tagDef);

        InitTypeMenu(null);
        InitTagMenu(null);
    }

    $('#save-btn').click(function () {
        var boo = $('.ui.form').form('validate form');
        if (boo) {
            postBlog(0)
        } else {
            console.log('校验失败');
        }

    });
    $('#publish-btn').click(function () {
        var boo = $('.ui.form').form('validate form');
        if (boo) {
            postBlog(1)
        } else {
            console.log('校验失败');
        }

    });


    function InitBlogContent(){
        $.ajax({
            url: myhost + "/blog/article/"+blogId,
            type: "GET",
            crossDomain: true,
            contentType: "application/json",
            dataType: "json",
            headers : {'Authorization':token},
            async:false,
            success: function (result) {
                var info = result.data;
                tagList = info.tags;
                if(info.copyRight){  //发布
                    document.getElementById("copyRightStatus").setAttribute("valuse","1");
                }else {//保存
                    document.getElementById("copyRightStatus").setAttribute("valuse","2");
                }
                $("#title").val(info.title);

                vditor.setValue(info.content);

                document.getElementById("typeValue").setAttribute("value",info.typeId);
                // $("#typeValue").value = info.typeId;
                InitTypeMenu(info.typeId);
                InitTagMenu(info.tags);


                var typeText = document.createElement("div");
                typeText.setAttribute("class","text");

                $("#md_content_value").empty();

                document.getElementById("recommend").setAttribute("checked","true");
                document.getElementById("appreciation").setAttribute("checked","true");
                document.getElementById("comment").setAttribute("checked","true");

                $("#publish-btn").empty();
                document.getElementById("publish-btn").append("修改");

            }
        })
    }

    function postBlog(input){
        var articleId = sessionStorage.getItem("updatId");
        var status;
        if(input ==1){  //发布
            status = new Boolean(1);
        }else {//保存
            status = new Boolean(0);
        }
        var title = $('#title').val();
        var inputCopyRight = document.getElementById("copyRightStatus").getAttribute("value");
        if (inputCopyRight == 1){
            var copyRight = new Boolean(1);
        }else{
            var copyRight = new Boolean(0);
        }

        var type = document.getElementById("typeValue").getAttribute("value");

        var tag = document.getElementById("tagValue").getAttribute("value");
        var tags = tag.split(",");

        var content = vditor.getValue();

        var recommend = document.getElementById("recommend").checked;
        var appreciation = document.getElementById("appreciation").checked;
        var comment = document.getElementById("comment").checked;


        var method ;
        if(blogId != null){
            method = "PUT";
        }else{
            method = "POST";
        }
        $.ajax({
            url: myhost + "/blog/article",
            type: method,
            crossDomain: true,
            contentType: "application/json",
            dataType: "json",
            headers : {'Authorization':token},
            data: JSON.stringify({
                "id":articleId,
                "title":title,
                "summary":null,
                "userId":user[0],
                "typeId":type,
                "tags":tags,
                "copyRight":copyRight,
                "recommend":recommend,
                "commentabled":comment,
                "appreciation":appreciation,
                "status":status,
                "content":content
            }),
            success:function (result) {
                alert("成功");
                window.location.href = "blogs.html";
            },
            error:function (error) {
                alert(error.responseText[2]);
            }
        });
    }

});


function InitTagMenu(tags){
    $.ajax({
        url: myhost + "/blog/tag/list",
        type: "GET",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "size": 10,
            "page": 1,
        }),
        // <div class="item" data-value="1">错误日志</div>
        success: function (result) {
            // <div class="default text">标签</div>
            $.each(result.data,function (index,item) {

                var div = document.createElement("div");

                if(tags != null && tags.indexOf(item.id) != -1){
                    div.setAttribute("class","item active filtered");
                    document.getElementById("tagValue").setAttribute("value",tags);
                    var a = document.createElement("a");
                    a.setAttribute("class","ui label transition visible");
                    a.setAttribute("data-value",item.id);
                    a.setAttribute("style","display: inline-block !important;");
                    a.append(item.name);
                    var i = document.createElement("i");
                    i.setAttribute("class","delete icon");
                    a.append(i);
                    $("#tagshow").append(a);
                }else {
                    div.setAttribute("class","item");
                }

                div.setAttribute("data-value",item.id);
                div.append(item.name);
                $("#tagMenu").append(div);
            })
        }
    })
}

function InitTypeMenu(typeId){
    $.ajax({
        url: myhost + "/blog/type/list",
        type: "GET",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "size": 10,
            "page": 1,
        }),
        success: function (result) {
            $.each(result.data,function (index,item) {
                var div = document.createElement("div");
                if(typeId != null && typeId == item.id){
                    div.setAttribute("class","item active selected");
                    document.getElementById("defTypeText").append(item.name);
                }else {
                    div.setAttribute("class","item");
                    document.getElementById("defTypeText").append("");
                }
                div.setAttribute("data-value",item.id);
                div.append(item.name);
                $("#typeMenu").append(div);
            })
        }
    })
}

$('.ui.dropdown').dropdown({
    on : 'hover'
});


$('.ui.form').form({
    fields : {
        title : {
            identifier: 'title',
            rules: [{
                type : 'empty',
                prompt: '请输入博客标题'
            }]
        },
        md_content_value : {
            identifier: 'md_content_value',
            rules: [{
                type : 'empty',
                prompt: '请输入博客内容'
            }]
        },
        typeValue : {
            identifier: 'typeValue',
            rules: [{
                type : 'empty',
                prompt: '请选择类型'
            }]
        },
        tagValue : {
            identifier: 'tagValue',
            rules: [{
                type : 'empty',
                prompt: '请选择标签'
            }]
        },
    }
});
