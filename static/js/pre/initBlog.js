//加载文章信息 节点名，数组
function Blog(name,contents) {
    $.each(contents,function (index,item) {
        var divp = document.createElement('div');
        divp.setAttribute("class","ui vertical padded segment m-padded-tb-large m-mobile-lr-clear");

        var divc = document.createElement('div');
        divc.setAttribute("class","ui mobile reversed stackable grid");
        divp.appendChild(divc);

        var divcc1 = document.createElement('div');
        divcc1.setAttribute("class","eleven wide column");

        //标题
        var article_title_h = document.createElement('h3');
        article_title_h.setAttribute("class","ui header");
        var article_title = document.createElement('a');
        article_title.href = "#";
        article_title.setAttribute("onclick","toBlogHref("+item.id+")");
        article_title.innerText = item.title;
        article_title_h.appendChild(article_title);

        //简介
        var summary = document.createElement('p');
        summary.setAttribute("class","m-text ");
        summary.innerText = item.summary;

        var divccc = document.createElement('div');
        divccc.setAttribute("class","ui stackable grid");


        var rowDiv1=document.createElement('div');
        rowDiv1.setAttribute("class","row");


        var divccc1 = document.createElement('div');
        divccc1.setAttribute("class","eleven wide column");

        var divs = document.createElement('div');
        divs.setAttribute("class","ui mini horizontal link list");
        //头像名字
        var userDiv = document.createElement('div');
        userDiv.setAttribute("class","item");

        //头像
        var avatardiv = document.createElement('img');
        avatardiv.setAttribute("class","ui avatar image");
        var usernamediv = document.createElement('div');
        usernamediv.setAttribute("class","content");


        var usernameA = document.createElement('div');
        usernameA.setAttribute("class","header");
        $.ajax({

            url:myhost+"/blog/user/"+item.userId,
            dataType:"JSON",
            type: "GET",
            contentType : "application/json;charset-UTF-8",
            crossDomain: true,
            success: function (result) {
                if(result.data.avatar != null)
                    avatardiv.src = result.data.avatar;
                else
                    avatardiv.src ="../static/images/img_30.jpg";
                usernameA.innerText = result.data.nickname;
                usernameA.href = "#";
            }
        });
        usernamediv.appendChild(usernameA);
        userDiv.appendChild(avatardiv);
        userDiv.appendChild(usernamediv);

        //日期
        var dateDiv = document.createElement('div');
        dateDiv.setAttribute("class","item");
        var dateDiv_i = document.createElement('i');
        dateDiv_i.setAttribute("class","calendar icon");
        dateDiv.appendChild(dateDiv_i);
        dateDiv.append(item.createTime);

        //阅读数量
        var viewsDiv = document.createElement('div');
        viewsDiv.setAttribute("class","item");
        var viewsDiv_i = document.createElement('i');
        viewsDiv_i.setAttribute("class","eye icon");
        viewsDiv.appendChild(viewsDiv_i);
        viewsDiv.append(item.views);
        divs.appendChild(userDiv);
        divs.appendChild(dateDiv);
        divs.appendChild(viewsDiv);
        divccc1.appendChild(divs);

        var typeDiv = document.createElement('div');
        typeDiv.setAttribute("class","right five wide column");
        var typeDiv_a = document.createElement('a');
        typeDiv_a.setAttribute("class","ui teal basic label m-padded-thiny m-text-thin");
        typeDiv_a.setAttribute("onclick","toTypeHref("+item.typeId+")");
        $.ajax({

            url:myhost+"/blog/type/"+item.typeId,
            dataType:"JSON",
            type: "GET",
            contentType : "application/json;charset-UTF-8",
            crossDomain: true,
            success: function (result) {
                typeDiv_a.innerText = result.data.name;
            }
        });
        typeDiv.appendChild(typeDiv_a);


        rowDiv1.appendChild(divccc1)
        rowDiv1.appendChild(typeDiv);

        var rowDiv2 = document.createElement('div');
        rowDiv2.setAttribute("class","row");
        var rowDiv2_div = document.createElement('div');
        rowDiv2_div.setAttribute("class","column");
        //获取该文章的所有标签
        $.ajax({
            url:myhost+"/blog/tag/article/"+item.id,
            dataType:"JSON",
            type: "GET",
            contentType : "application/json;charset-UTF-8",
            crossDomain: true,
            success: function (result) {
                $.each(result.data,function (index2,item2) {
                    var rowDiv2_div_a = document.createElement('a');
                    rowDiv2_div_a.setAttribute("class","ui m-padded-mini m-text-thin basic orange left pointing label");
                    rowDiv2_div_a.setAttribute("onclick","toTagHref("+item2.id+")");
                    rowDiv2_div_a.href = "#";
                    rowDiv2_div_a.append(item2.name);
                    rowDiv2_div.appendChild(rowDiv2_div_a);
                });
            }
        });
        rowDiv2.appendChild(rowDiv2_div);

        divccc.appendChild(rowDiv1);
        divccc.appendChild(rowDiv2);



        divcc1.appendChild(article_title_h);
        divcc1.appendChild(summary);
        divcc1.appendChild(divccc);
        divc.appendChild(divcc1);
        //右边部分
        var picDiv = document.createElement('div');
        picDiv.setAttribute("class","five wide column");
        //封面图片
        var divcc2_a = document.createElement('a');
        picDiv.appendChild(divcc2_a);
        var divcc2_a_img = document.createElement('img');
        divcc2_a_img.width = 800;
        divcc2_a_img.height = 170;
        divcc2_a_img.setAttribute("class","ui rounded image");
        if(item.picture == null)
            divcc2_a_img.src = "https://picsum.photos/id/1005/800/450";
        else
            divcc2_a_img.src = item.picture;
        divcc2_a.appendChild(divcc2_a_img);

        divc.appendChild(picDiv);

        divp.appendChild(divc);
        document.getElementById(name).append(divp);
    })
}