var markdown;
var blogId = sessionStorage.getItem("blogId");
$(function() {
    InitArticle();

    hljs.initHighlightingOnLoad();

    $('.ui.sticky').sticky({
        context: '#content'
    });
    initToc();


    //为表单提供样式
    $('table').each(function(i,n){
        $(n).attr("class","ui table");
    });

    $('#payButton').popup({
        popup: $('.payQR.popup'),
        on:'click',
        position:'bottom center'
    });

    //平滑滚动
    $('#tocTop-button').click(function () {
        $(window).scrollTo(0,500);
    });

    //滚动检测
    var waypoint = new Waypoint({
        element: document.getElementById('blogCenter'),
        handler: function(direction) {
            $("#waypoint_toc").show();
            if (direction == 'down') {
                $('#toolbar').show(100);
            } else{
                $('#toolbar').hide(100);
            }
        }
    })


    $('.ui.form').form({
        fields : {
            commend : {
                identifier: 'commend',
                rules: [{
                    type : 'empty',
                    prompt: '请输入内容',
                }]
            },
            nickname : {
                identifier: 'nickname',
                rules: [{
                    type : 'empty',
                    prompt: '请输入姓名',
                }]
            },
            email : {
                identifier: 'email',
                rules: [{
                    type : 'email',
                    prompt: '请输入邮箱格式',
                },{
                    type : 'email',
                    prompt: '邮箱不能为空',
                }]
            },
        },
    });

    $('#commentpost-btn').click(function () {
        var boo = $('.ui.form').form('validate form');
        if (boo) {
            postComment();
        } else {
            console.log('校验失败');
        }
    });

});




function getUserInfo(userId) {
    var user = new Array();
    $.ajax({
        url: myhost + "/blog/user/" + userId,
        type: "GET",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        async:false,
        success: function (result) {
            user[0] = result.data.id;
            user[1] = result.data.nickname;
            user[2] = result.data.avatar;
        }
    })
    return user ;
}


function InitArticle() {
    $.ajax({
        url: myhost + "/blog/article/html/"+blogId,
        type: "GET",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        async:false,
        success: function (result) {

            //获取用户信息
            var user = getUserInfo(result.data.userId);

            if(user[2] == null)
                $("#avater").src ="https://picsum.photos/id/1002/100/100";
            else
                $("#avater").src = user[2];
            $("#userName").append(user[1]);
            $("#auth_master").append(user[1]);

            $("#dates").append(result.data.createTime);
            $("#auth_createtime").append(result.data.createTime);
            $("#views").append(result.data.views);

            document.title =   result.data.title;

            $("#picture").attr("src",result.data.picture) ;

            $("#views").src = "https://picsum.photos/id/1005/800/450";

            if(result.data.copyRight){
                var div =  document.getElementById("copyRight");
                div.setAttribute("class","ui orange basic label");
                div.append("原创");
            }else {
                var div =  document.getElementById("copyRight");
                div.setAttribute("class","ui red basic label");
                div.append("转载");
            }
            $("#title").append(result.data.title);
            $("#content").append(result.data.content);

            document.title =   result.data.title;

            //标签
            var tags = document.getElementById("tags");
            $.each(result.data.tags,function (index,item) {
                $.ajax({
                    url: myhost + "/blog/tag/" + item,
                    dataType: "JSON",
                    type: "GET",
                    contentType: "application/json;charset-UTF-8",
                    crossDomain: true,
                    success: function (result) {
                        var a = document.createElement("a");
                        a.setAttribute("onclick","toTagHref("+result.data.id+")");
                        a.setAttribute("class","ui teal basic  left pointing large label m-margin-tb-thiny");
                        a.innerText= result.data.name;
                        tags.append(a);
                    }
                })
            })

            if(result.data.appreciation){
                $("#appreciate").show();
            }

            //开启评论
            if(result.data.commentabled){
                $("#comment-container").show();
                InitCommends(result.data.id);
            }


        }
    });
}


function postComment() {
    var nickname = $("#nickname").val();
    var email = $("#email").val();
    var content = $("#commend").val();
    $.ajax({
        url: myhost + "/blog/comment",
        dataType: "JSON",
        type: "POST",
        contentType: "application/json;charset-UTF-8",
        crossDomain: true,
        data:JSON.stringify({
            "nickname":nickname,
            "bolgId":blogId,
            "email":email,
            "content":content,
            "parentCommentId":parentCommentId
        }),
        success: function (result) {
            alert("评论成功");
            $("#parnetName").empty();
            parentCommentId = null;
            $("#commentDiv").empty();
            InitCommends(blogId);
        }
    })
}

//目录生成
function initToc() {
    var id = 1;
    $("#content").children("h1,h2,h3,h4,h5").each(function () {
        // entry-content 为正文容器的 class，根据自己的情况修改
        //var hyphenated = $(this).text().replace(/\s/g, '-');
        // 如果你希望使用中文 id 的话就用上面这行，注意非ANSI编码文字会导致无法跳转
        var hyphenated = "mashiro-" + id;
        $(this).attr('id', hyphenated);
        id++;
    });

    tocbot.init({
        //构建目录的容器
        tocSelector: '.js-toc',
        // 文章容器.
        contentSelector: '.js-toc-content',
        // 需要解析的标题
        headingSelector: 'h1,h2,h3',
        positionFixedSelector: ".js-toc", //目录位置固定

        scrollSmooth: true,
        scrollSmoothOffset: -80,
        headingsOffset: -500
    });
}